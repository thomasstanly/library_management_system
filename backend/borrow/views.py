from django.shortcuts import render
from django.db.models import Q
from django.db.models import Prefetch
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import GenericAPIView
from  rest_framework.response import Response
from rest_framework import status
from .models import Borrow,FinePayment
from razorpay_backend.models import Membership_payment
from librarian.models import Patron
from book.models import Book_variant
from membership.models import Membership_plan
from .serializers import *
from datetime import datetime,date


# Create your views here.
class Check_out(GenericAPIView):

    def get(self, request, *args, **kwargs):
       
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')
        filter_option = request.GET.get('filter_option')

        valid_filter_options = ['borrowed_date', 'due_date', 'return_date']
        if filter_option and filter_option not in valid_filter_options:
            return Response({"error": "Invalid filter option"}, status=status.HTTP_400_BAD_REQUEST)

        if start_date and end_date and filter_option:
            filter_params = {f"{filter_option}__range": [start_date, end_date]}
            borrows = Borrow.objects.filter(**filter_params).order_by('-return_date')
            count = borrows.count()
            serlizer = BorrowSerializer(borrows, many=True)
            return Response({'result':serlizer.data,'count':count})
        else:
            borrows = Borrow.objects.all().order_by('-return_date')
            count = borrows.count()
            serlizer = BorrowSerializer(borrows, many=True)
            return Response({'result':serlizer.data,'count':count})

    
    def post(self,request,*args,**kwargs):
        stock_no = request.data.get('stock')
        id = request.GET.get('patron_id')
        patron = Patron.objects.get(id=id)
        try:
            fine=FinePayment.objects.filter(Q(borrow__patron=patron) & Q(fine_status= 'PENDING'))
            if fine.exists():
                return Response({"error":"The fine payment is still outstanding"},status=status.HTTP_400_BAD_REQUEST)
        except FinePayment.DoesNotExist:
            pass
        
        try:
            payment = Membership_payment.objects.filter(patron_id=id).latest('expiry_date')

            if payment.expiry_date >= datetime.now().date():
                book_count = Borrow.objects.filter(patron=patron, return_date=None).count()

                if book_count < patron.membership_id.no_books:
                    already_borrowed = Borrow.objects.filter(book__stock_no=stock_no, return_date=None).exists()
                    
                    if not already_borrowed:
                        try:
                            book = Book_variant.objects.get(stock_no=stock_no)
                            borrower = Borrow.objects.create(book=book, patron=patron)
                            borrower.calculate_due_date()
                            borrower.save()
                            return Response({"message": "The borrower is created"}, status=status.HTTP_201_CREATED)
                        except Book_variant.DoesNotExist:
                            return Response({"error": "The book does not exist"}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        already_borrowed = Borrow.objects.select_related('patron').get(book__stock_no=stock_no, return_date=None)
                        patron = already_borrowed.patron
                        patron_name = f"{patron.membership_id.plan_code} {patron.id} {patron.first_name} {patron.last_name}"
                        return Response({"error": f"The book is already borrowed by {patron_name} and not returned yet."}, status=status.HTTP_400_BAD_REQUEST)
                        
                else:
                    return Response({"error": "You have reached the maximum number of books you can borrow at one time."}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"error": "Your membership has expired!"}, status=status.HTTP_410_GONE)
        except:
            return Response({'error':'No active membership found for this user.'},status=status.HTTP_400_BAD_REQUEST)

class Check_in_and_Renew(GenericAPIView):

    def get(self,requet,*args,**kwargs):
        
        patron_id = requet.GET.get('patron_id')
        stock = requet.GET.get('stock')
        already_borrowed = Borrow.objects.select_related('patron').get(book__stock_no=stock, return_date=None)
        if already_borrowed.renewal == False:
            already_borrowed.renewal = True
            plan = Membership_plan.objects.get(id = already_borrowed.patron.membership_id.id)
            today = datetime.now().date()
            if today <=  already_borrowed.due_date:
                already_borrowed.due_date += timedelta(days=plan.return_period)
                already_borrowed.save()
            elif today > already_borrowed.due_date:
                return Response({"error":"time expiry"},status=status.HTTP_400_BAD_REQUEST)
            return Response({'message':"book is renewed"})
        else:
            return Response({'message':'book already renewed'})

    def post(self, request, *args, **kwargs):
        
        try:
            
            stock_no = request.data.get('stock')
           
            try:
                already_borrowed = Borrow.objects.select_related('patron').get(book__stock_no=stock_no, return_date=None)
                already_borrowed.return_date = datetime.now() 
                already_borrowed.save()
                serializer = BorrowSerializer(already_borrowed)
                return Response(serializer.data,status=status.HTTP_200_OK)
            
            except Borrow.DoesNotExist:
                return Response({"error": "Book with provided stock number is not check out."},status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"error": "stock number not found"},status=status.HTTP_400_BAD_REQUEST)
        
class Patron_Checkout(GenericAPIView):

    def get(sef,request,*args,**kwargs):
        patron_id = request.GET.get('patron_id')
        try:
            borrowed = Borrow.objects.filter(patron__id= patron_id).order_by('-borrowed_date')
        except:
            return Response({"Error":"Patron id doesnot exist"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        serializer = BorrowSerializer(borrowed,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class Book_complete_list(GenericAPIView):

    def get(self, request, *args, **kwargs):
        book_id = request.GET.get('book')
        book_variant = Book_variant.objects.filter(book__id=book_id)

        book_list = []
        for book in book_variant:
            try:
                loan = Borrow.objects.select_related('patron').get(book=book.id, return_date=None)
            except Borrow.DoesNotExist:
                loan = None
        
            book_list.append({
                'id':book.id,
                'stock_no': book.stock_no,
                'title': book.book.title,
                'language': book.language.language,
                'category': book.book.category.category_name,
                'call_number':book.book.call_number,
                'publisher':{'name':book.publisher.publisher_name,
                             'year':book.publishing_year},
                'patron':  None if loan is None else f"{loan.patron.first_name} {loan.patron.last_name}",
                'plan': None if loan is None else f"{loan.patron.membership_id.plan_code} {loan.patron.id}",
                'borrow_date': None if loan is None else loan.borrowed_date ,
                'due_date':None if loan is None else loan.due_date,
            })
        return Response({"data": book_list}, status=status.HTTP_200_OK)

class FinePAymentRetriveAPIViews(GenericAPIView):

    def get(self,request,*args,**kwargs):

        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')
        filter_option = request.GET.get('filter_option')
        fine = FinePayment.objects.all()
        try:
            if start_date and end_date:
                fine = fine.filter(borrow__due_date__range = [start_date, end_date])
        except ValueError as e:
            return Response({"error": "Invalid date range"}, status=status.HTTP_400_BAD_REQUEST)
        
        fine = fine.order_by('-date_assessed')
        count = fine.count()
        serializer = FineListSerializer(fine, many=True)

        return Response({'result':serializer.data,'count':count})