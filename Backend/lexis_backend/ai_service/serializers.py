from rest_framework import serializers
from .models import ChatArchive

class ChatArchiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatArchive
        fields = '__all__'
        
        