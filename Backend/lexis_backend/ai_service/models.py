from django.db import models
from django.contrib.auth.models import User 
# Create your models here.


class UserPrompt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    result = models.TextField()
    date_generated = models.DateTimeField(auto_now_add=True)