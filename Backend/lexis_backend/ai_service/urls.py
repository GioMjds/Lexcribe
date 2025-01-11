from django.urls import path
from . import views
urlpatterns = [
    path('prompt/', views.general_ai_prompt, name="ai-prompt"),
    path('archives/', views.get_chat_history,name="archive")
]
