from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate,logout
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
import os
from .email.emails import send_otp_to_email
from django.contrib.auth.models import User
from rest_framework import status
from .google.oauth import google_auth
import requests
from django.core.cache import cache

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def log_out(request):
    logout(request)
    return Response({'success': 'Logged out successfully'},status=status.HTTP_200_OK)

@api_view(["POST"])
def email_otp(request):
    try:     
        email = request.data.get("email")
        otp_generated = send_otp_to_email(email)
        OTP_EXPIRATION_TIME = 120
        cache.set(email,otp_generated,OTP_EXPIRATION_TIME)        
        otp_in_cache = cache.get(email)
        
        if otp_in_cache:
           return Response({"error": "OTP already sent. Please wait for it to expire."}, status=400)
        
        return Response({"success":"OTP sent"}, status= status.HTTP_200_OK)    
    except Exception as e:
        print(f"{e}")
        
@api_view(["POST"])
def resend_otp(request):
    try:     
        email = request.data.get("email")
        otp_generated = send_otp_to_email(email)
        OTP_EXPIRATION_TIME = 120
        cache.set(email,otp_generated,OTP_EXPIRATION_TIME) 
        
        return Response({"success":"OTP sent"}, status= status.HTTP_200_OK)    
    except Exception as e:
        print(f"{e}")


@api_view(["POST"])
def register_user(request):
    try:
        
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        recieved_otp = request.data.get("otpCode")
        
        cached_otp = cache.get(email)
        
      
        if cached_otp is None:
            return Response({"error": "OTP expired. Please request a new one."}, status=status.HTTP_404_NOT_FOUND)
        
        
        if cached_otp and str(cached_otp) == str(recieved_otp):
            user = User.objects.create(
                username=username,
                email=email,
                password=make_password(password)  
            )
            
         
            user.save()
            
 
            refresh = RefreshToken.for_user(user)
            
            return Response({
                "success": "User registered successfully.",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_200_OK)        
        else:
            return Response({"error": "Incorrect OTP code. Please try again."}, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
      
        print(f"Error: {e}")
        return Response({"error": "An error occurred during registration. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
    
    
    
@api_view(["POST"])
def user_login(request):
    
    try:
        
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({"invalid": "Please fill out all fields"}, status=status.HTTP_400_BAD_REQUEST)
            
        user = User.objects.filter(email=email).first()
        
        if not user:
            return Response({"email": "Email is not found"}, status= status.HTTP_404_NOT_FOUND)
        
        username = user.username
        
        user_auth = authenticate(request, username=username, password = password)
        
        if user_auth is None:
            return Response({"password":"Your password is incorrect"}, status= status.HTTP_401_UNAUTHORIZED)
        
        get_token = RefreshToken.for_user(user_auth)
        
        return Response({"success": "User have successfully login",
                         'refresh': str(get_token),
                         'access': str(get_token.access_token)},status=status.HTTP_200_OK)
        
        
    
    except Exception as e:
        return Response({"error": f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 

@api_view(["POST"])
def user_signup(request):
    try:
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        repeat_pass = request.data.get('confirm')

        if not username or not email or not password or not repeat_pass:
            return Response({"invalid": "Please fill out all fields"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"user": "Username already exists"}, status=status.HTTP_403_FORBIDDEN)

        if User.objects.filter(email=email).exists():
            return Response({"email": "Email is already in use"}, status=status.HTTP_403_FORBIDDEN)

        if password != repeat_pass:
            return Response({"pass": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"success": "User passed data validation"}, status= status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status= status.HTTP_500_INTERNAL_SERVER_ERROR)

    

@api_view(["POST"])
def google_login(request):
    try:
        code = request.data.get("code")
        
        if not code:
            return Response({"error": "Authorization code is required"}, status= status.HTTP_400_BAD_REQUEST)
        
        CLIENT_ID = os.getenv("CLIENT_ID")
        CLIENT_SECRET = os.getenv("CLIENT_SECRET")
        
        email, username = google_auth(code,CLIENT_ID,CLIENT_SECRET)
       
        
        if email and username:
            user, created = User.objects.get_or_create(email=email, defaults={'username':username})
            get_token = RefreshToken.for_user(user)
            access_token = str(get_token.access_token)
            refresh_token = str(get_token)
        else:
            return Response({"error": "Failed to sign in using google"},status= status.HTTP_400_BAD_REQUEST)
        
       
        return Response({"success": "User has successfully login with google",
                         "access_token": access_token,
                         "refresh_token": refresh_token}, status= status.HTTP_200_OK)
    except Exception as e:
        print(f"{e}")
        return Response({"error": "Network Error"}, status= status.HTTP_500_INTERNAL_SERVER_ERROR)