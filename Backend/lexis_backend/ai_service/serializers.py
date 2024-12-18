from rest_framework import serializers
from .models import UserPrompt

class UserPromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPrompt
        fields = ["result"]