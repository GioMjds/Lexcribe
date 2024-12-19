from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', views.user_login, name = "login"),
    path('token/', TokenObtainPairView.as_view(),name = "get_token"),
    path('refresh/', TokenRefreshView.as_view(),name = "refresh_token"),
    path('signup/', views.user_signup, name= "signup"),
    path('google-auth/', views.google_login ,name= "google-login"),
    path('email-otp/', views.email_otp ,name= "email-otp"),
    path('register/', views.register_user ,name= "register-user"),
    path('res-otp/', views.resend_otp ,name= "resend-otp"),
    path('logout/', views.log_out,name= "logout"),
    
]
