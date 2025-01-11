from django.db import models
from django.contrib.auth.models import User 
# Create your models here.





class Survey(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    answer_1 = models.CharField(max_length=100)
    answer_2 = models.CharField(max_length=100)
    answer_3 = models.CharField(max_length=100)
    answer_4 = models.CharField(max_length=100)
    answer_5 = models.CharField(max_length=100)
    answer_6 = models.CharField(max_length=100)
    answer_7 = models.CharField(max_length=100)
    answer_8 = models.CharField(max_length=100, default="")  # Default value for existing rows
    answer_9 = models.CharField(max_length=100, default="")  # Default value for existing rows
    answer_10 = models.CharField(max_length=100, default="") 
    

class ChatArchive(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    prompt_title = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    


class Subjects(models.Model):
    subject = models.CharField(max_length=255)
    
def get_default_subject_id():
    try:
        return Subjects.objects.get(subject="General").id
    except Subjects.DoesNotExist:
        return None  
    
class Chat(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    archive_id = models.ForeignKey(ChatArchive, on_delete=models.CASCADE)
    subject_id = models.ForeignKey(
        Subjects, 
        on_delete=models.CASCADE, 
        default=get_default_subject_id 
    )
    user_prompt = models.TextField()
    ai_response = models.TextField()
