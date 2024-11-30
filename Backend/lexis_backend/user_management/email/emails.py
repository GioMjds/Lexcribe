from django.core.mail import send_mail
import random
from django.conf import settings



def send_otp_to_email(email):
    try:
        otp = random.randint(100000,999999)
        subject = f"Your Account Verification Code"
        message = f"Your OTP for account verification is {otp}"
        email_from = settings.EMAIL_HOST
        send_mail(subject, message, email_from,[email])
        return otp
        
    except Exception as e:
        print({e})
        return None


def send_reset_password(email):
    try:
        
        otp = random.randint(100000, 999999)
        subject = f"Your verification code for password reset"
        message = f"Your OTP for password verification is {otp}"
        email_from = settings.EMAIL_HOST
        send_mail(subject, message, email_from,[email])
        return otp
        
        
    except Exception as e:
        print(f"{e}")
        return None

   

