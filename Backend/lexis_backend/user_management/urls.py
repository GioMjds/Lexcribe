from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', views.user_login, name="login"),
    path('token/', TokenObtainPairView.as_view(), name="get_token"),
    path('refresh/', TokenRefreshView.as_view(), name="refresh_token"),
    path('signup/', views.user_signup, name="signup"),
    path('google-auth/', views.google_login, name="google-login"),
    path('email-otp/', views.email_otp, name="email-otp"),
    path('email-otp/resend/', views.resend_otp, name="resend-email-otp"),
    path('register/', views.register_user, name="register-user"),
    path('logout/', views.log_out, name="logout"),
    path('reset-password/email/', views.reset_password_email, name="reset-password-email"),
    path('reset-password/resend/', views.resend_reset_otp, name="resend-reset-otp"),
    path('reset-password/verify/', views.reset_password_otp, name="verify-reset-otp"),
    path('reset-password/confirm/', views.reset_password, name="reset-password-confirm"),
]
