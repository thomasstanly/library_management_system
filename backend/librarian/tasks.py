from celery import shared_task
from django.core.mail import send_mail

@shared_task(bind=True)
def emial_verification(self,email, otp_value):
    send_mail(
        'OTP verification from Clang Mount',
        f"{otp_value} is your OTP from Clang Mount to verify your email. This is a computer-generated email.",
        'clangmount@gmail.com',
        [email],
        fail_silently=False
    )
    print('yes celery working')
    return "Done"