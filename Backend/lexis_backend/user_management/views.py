from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate,logout
from rest_framework_simplejwt.tokens import RefreshToken
import os
from django.contrib.auth.models import User
from rest_framework import status
from .google.oauth import google_auth
# Create your views here.
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
        
        user_auth = authenticate(request, username=username, password= password)
        
        if user_auth is None:
            return Response({"password":"Password is Incorrect"}, status= status.HTTP_401_UNAUTHORIZED)
        
        get_token = RefreshToken.for_user(user_auth)
        
        return Response({"success": "User have successfully login",
                         'refresh': str(get_token),
                         'access': str(get_token.access_token)},status=status.HTTP_200_OK)
        
        
    
    except Exception as e:
        return Response({"error": f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
@api_view(["POST"])
def user_signup(request):
    
    try:
        
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        confirm = request.data.get("confirm")
        
        if User.objects.filter(email = email).exists():
            return Response({"email": "Email is already in use."},status = status.HTTP_400_BAD_REQUEST)
        
        if password != confirm:
            return Response({"password":"Passwords does not match"}, status=status.HTTP_400_BAD_REQUEST)
        
    except Exception as e:
        return Response({"error": f"{e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["POST"])
def google_login(request):
        try:
            code = request.data.get('code')
            
            if not code:
                return Response({"error": "Authorization code is required"}, status= status.HTTP_400_BAD_REQUEST)
            
            CLIENT_ID = os.getenv("CLIENT_ID")
            CLIENT_SECRET = os.getenv("CLIENT_SECRET")
            
            email, username = google_auth(code,CLIENT_ID,CLIENT_SECRET)
            
            if email and username:
                user, created = User.objects.get_or_create(email = email, defaults={'username': username})           
                get_token = RefreshToken.for_user(user)
                access_token = str(get_token.access_token)
                refresh_token = str(get_token)
            else:
                return Response({"error": "Failed to sign in using google. Please try again later"},status=status.HTTP_400_BAD_REQUEST)
            
            
            return Response({"success": "Sign in with google is successful",
                             "access_token":access_token,
                             "refresh_token": refresh_token}, status=status.HTTP_200_OK)                
        except Exception as e:
            print(e)
            return Response({"error": f"{e}"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)