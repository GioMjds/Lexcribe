from django.urls import path
from . import views


urlpatterns = [
    path('login/', views.user_login, name = "login"),
    path('signup/', views.user_signup, name= "signup"),
    path('google-auth/', views.google_login ,name= "google-login")
]
