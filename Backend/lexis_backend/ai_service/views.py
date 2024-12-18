from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .utils.prompt import send_user_prompt
from .serializers import UserPromptSerializer
from rest_framework import status

from .models import UserPrompt

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def ai_prompt(request):
    """
    Handles AI prompt requests and saves the prompt and result to the database.
    """
    try:
       
        input = request.data.get("input")
        print("Received input:", input)

        if input is None:
            return Response({"error": "Prompt must not be empty"}, status=status.HTTP_403_FORBIDDEN)

        
        
        prompt_result = send_user_prompt(input)

        user_prompt = UserPrompt.objects.create(user=request.user, result=prompt_result)

        return Response({
                "success": "Prompt has been successfully processed.",
                "result": prompt_result
            }, status=status.HTTP_200_OK)

    except Exception as e:
        print(e)
        return Response({
            "error": "An error occurred while processing the prompt.",
            "details": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
