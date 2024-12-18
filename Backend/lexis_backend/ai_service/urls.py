from django.urls import path
from . import views
urlpatterns = [
    path('prompt/', views.ai_prompt, name="ai-prompt"),
]
