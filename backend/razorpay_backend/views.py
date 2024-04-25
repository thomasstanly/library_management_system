from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView,RetrieveAPIView
from rest_framework import status
from .models import Membership_payment, Transaction
from librarian.models import Patron
from .serializers import CreateOrderSerializers, TranscationSerializer, MembershipPaymentSerializer
from razorpay_backend.razorpay_conf.main import  RazorpayClient

rz_client = RazorpayClient()

class PaymentRetrieveAPIView(RetrieveAPIView):
    queryset = Membership_payment.objects.all()
    serializer_class = MembershipPaymentSerializer
    lookup_field = 'id' 
    
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
        
class TransactionAPIView(APIView):
    def post(self,request):
        serializer = TranscationSerializer(data=request.data)
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
                patron = Patron.objects.get(email=plan_status.patron)
                patron.membership_id=plan_status.membership_plan
                patron.save()
                payment_id = request.data.get('payment_id')
                payment_status = Transaction.objects.get(payment_id=payment_id)
                payment_status.status = "SUCCESS"
                payment_status.save()

                response ={
                    "status_code":status.HTTP_201_CREATED
                    ,'message':"successfull transaction"
                    ,"data":serializer.data
                }
                return Response(response,status=status.HTTP_201_CREATED)
            else:
                payment_id = request.data.get('payment_id')
                payment_status = Transaction.objects.get(payment_id=payment_id)
                payment_status.status = "FAILURE"
                payment_status.save()
                response ={
                    "status_code":status.HTTP_400_BAD_REQUEST
                    ,'message':"Signature mismatch"
                }
                return Response(response,status=status.HTTP_400_BAD_REQUEST)
        else:
            response ={
                    "status_code":status.HTTP_400_BAD_REQUEST
                    ,'message':"Bad Request"
                    ,"error":serializer.errors
                }
            return Response(response,status=status.HTTP_400_BAD_REQUEST)