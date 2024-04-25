import razorpay
from django.conf import settings

client = razorpay.Client(auth=(settings.KEY, settings.SECRET_KEY))

