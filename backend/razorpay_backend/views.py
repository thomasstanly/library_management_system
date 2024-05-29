from django.db.models import Sum
from django.db.models.functions import ExtractMonth
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView,RetrieveAPIView,GenericAPIView
from rest_framework import status
from .models import Membership_payment, Transaction
from librarian.models import Patron
from borrow.models import FinePayment
from borrow.serializers import BorrowSerializer
from .serializers import *
from razorpay_backend.razorpay_conf.main import  RazorpayClient

rz_client = RazorpayClient()



# create the order before payment
class PaymentCreateAPIView(CreateAPIView):
    serializer_class = MembershipPaymentSerializer
    queryset = Membership_payment.objects.all()

    def create(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# retrive the the choosen membsership for joinin
class OrderRetriveAPIView(RetrieveAPIView):
    serializer_class = MembershipOrderSerializer
    queryset = Membership_payment.objects.all()
    lookup_field = 'id'

# creating razoprpay order
class CreateOderAPIview(APIView):
    def post (self,request):
        serializer = CreateOrderSerializers(data=request.data)
        if serializer.is_valid():
            order_response = rz_client.create_order(
                amount=serializer.validated_data.get("amount"),
                currency='INR',
            )
            response ={
                "status_code":status.HTTP_201_CREATED
                ,'mwssage':"order created"
                ,"data":order_response
            }
            return Response(response,status=status.HTTP_201_CREATED)
        else:
            response ={
                "status_code":status.HTTP_400_BAD_REQUEST
                ,'mwssage':"Bad Request"
                ,"error":serializer.errors
            }
            return Response(response,status=status.HTTP_400_BAD_REQUEST)

#  creating razoprpay Payment confirmation
class TransactionAPIView(APIView):
    def post(self,request):
        serializer = MemTranscationSerializer(data=request.data)
        if serializer.is_valid():
            result = rz_client.verify_payment(razorpay_order_id=serializer.validated_data.get("order_id"),
                                     razorpay_payment_id=serializer.validated_data.get("payment_id"),
                                     razorpay_signature=serializer.validated_data.get("signature"))
            if result:
                serializer.save()
                id = request.data.get('membership_payment')
                print(id)
                plan_status = Membership_payment.objects.get(id=id)
                plan_status.status = 'PAID'
                plan_status.save()
                payment_id = request.data.get('payment_id')
                payment_status = Transaction.objects.get(payment_id=payment_id)
                payment_status.status = "SUCCESS"
                payment_status.save()
                patron = Patron.objects.get(email=plan_status.patron)
                patron.membership_id=plan_status.membership_plan
                patron.mebership_date=plan_status.expiry_date
                patron.save()

                response ={
                    'message':"successfull transaction"
                    ,"data":serializer.data
                }
                return Response(response,status=status.HTTP_201_CREATED)
            else:
                payment_id = request.data.get('payment_id')
                payment_status = Transaction.objects.get(payment_id=payment_id)
                payment_status.status = "FAILURE"
                payment_status.save()
                response ={
                    'message':"Signature mismatch"
                }
                return Response(response,status=status.HTTP_400_BAD_REQUEST)
        else:
            response ={
                    'message':"Bad Request"
                    ,"error":serializer.errors
                }
            return Response(response,status=status.HTTP_400_BAD_REQUEST)
        

class PaymentRetrieveAPIView(GenericAPIView):
    serializer_class = MembershipOrderSerializer
    lookup_field = 'patron'

    def get(self, request, *args, **kwargs):
       
        try:
            patron_id = self.kwargs.get('patron')
            queryset = Membership_payment.objects.filter(patron_id=patron_id).order_by('-expiry_date')
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Membership_payment.DoesNotExist:
            return Response({"error": "No Membership_payment matches the given query."}, status=status.HTTP_404_NOT_FOUND)

class MembershipPaymentListAPIViews(GenericAPIView):
    
    def get(self,request,*args,**kwargs):

        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')
        payment = Membership_payment.objects.all()

        try:
            if start_date and end_date:
                payment = payment.filter(from_date__range=[start_date,end_date])
        except ValueError as e:
            return Response({"error": "Invalid date range"}, status=status.HTTP_400_BAD_REQUEST)
        
        payment = payment.order_by('-from_date')
        serializer = MembershipPaymentListserializer(payment,many=True)
        count = payment.count()
        return Response({'result':serializer.data,'count':count})


# fine pyment through razor pay
class FinePaymentRquestAPIViews(GenericAPIView):

    def post(self,request,*args,**kwargs):

        fine_id = request.GET.get('fine_id')
        if not fine_id:
            return Response({"error": "fine_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            fine = FinePayment.objects.get(id=fine_id)
            borrower = fine.borrow
            if borrower.return_date == None:
                return Response({"error":"Return the book and make the payment"},status=status.HTTP_400_BAD_REQUEST) 
        except:
            return Response({"error": "Fine not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CreateOrderSerializers(data=request.data)
        if serializer.is_valid():
            order_response = rz_client.create_order(
                amount=serializer.validated_data.get("amount"),
                currency='INR',
            )
            response ={
                "status_code":status.HTTP_201_CREATED
                ,'mwssage':"order created"
                ,"data":order_response
            }
            return Response(response,status=status.HTTP_201_CREATED)
        else:
            response ={
                "status_code":status.HTTP_400_BAD_REQUEST
                ,'message':"Bad Request"
                ,"error":serializer.errors
            }
            return Response(response,status=status.HTTP_400_BAD_REQUEST)

class FineTransctionAPIViews(GenericAPIView):
    def post(self,request,*args,**kwargs):
        serializer = FineTranscationSerializer(data=request.data)
        if serializer.is_valid():
            result = rz_client.verify_payment(razorpay_order_id=serializer.validated_data.get("order_id"),
                                     razorpay_payment_id=serializer.validated_data.get("payment_id"),
                                     razorpay_signature=serializer.validated_data.get("signature"))
            if result:
                serializer.save()
                id = request.data.get('fine_payment')
                print(id)
                fine_status = FinePayment.objects.get(id=id)
                fine_status.fine_status = 'SUCCESS'
                fine_status.save()
                payment_id = request.data.get('payment_id')
                payment_status = Transaction.objects.get(payment_id=payment_id)
                payment_status.status = "SUCCESS"
                payment_status.save()

                response ={
                    'message':"Over due is settled"
                    ,"data":serializer.data
                }
                return Response(response,status=status.HTTP_201_CREATED)
            else:
                payment_id = request.data.get('payment_id')
                payment_status = Transaction.objects.get(payment_id=payment_id)
                payment_status.status = "FAILURE"
                payment_status.save()
                response ={
                    'message':"Signature mismatch"
                }
                return Response(response,status=status.HTTP_400_BAD_REQUEST)
        else:
            response ={
                    'message':"Bad Request"
                    ,"error":serializer.errors
                }
            return Response(response,status=status.HTTP_400_BAD_REQUEST)


#dashboard
class Dashboard(GenericAPIView):

    def get(self,request,*args,**kwargs):
        paid_payments = Membership_payment.objects.filter(status='PAID')

        monthly = paid_payments.annotate(month=ExtractMonth('from_date')).values('month').annotate(total_sum=Sum('amount_paid')).order_by('month')
        
        all_months = {month: 0 for month in range(1, 13)}

        for data in monthly:
            all_months[data['month']] = data['total_sum']

        monthly_list = [{'month': month, 'total_sum': total_sum} for month, total_sum in sorted(all_months.items())]
        serializer = DashboardSerializer(monthly_list,many=True)

        fine_payment = FinePayment.objects.all()
        sum_of_success = fine_payment.filter(fine_status='SUCCESS').aggregate(total_paid=Sum('amount'))['total_paid'] or 0
        sum_of_pending = fine_payment.filter(fine_status='PENDING').aggregate(total_unpaid=Sum('amount'))['total_unpaid'] or 0

        pie = {
            'total_paid': sum_of_success,
            'total_unpaid': sum_of_pending,
        }
        return Response({'chart':serializer.data,'pie':pie})