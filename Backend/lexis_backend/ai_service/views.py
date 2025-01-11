from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .utils.prompt import send_user_prompt
from rest_framework import status
from .models import Chat,ChatArchive,Subjects,Survey

from .serializers import ChatArchiveSerializer

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def general_ai_prompt(request):
    """
    Handles AI prompt requests and saves user generated data for
    chat history retrieval
    
    """
    try:
       
        input = request.data.get("input")    

        prompt_title = str(input)[:25]
        chat_archive =  ChatArchive(user = request.user, prompt_title = prompt_title)
        

        if input is None:
            return Response({"error": "Prompt must not be empty"}, status=status.HTTP_403_FORBIDDEN)
        
    
        subject = Subjects.object.get(subject =  "General")
            

        prompt_result = send_user_prompt(input)
        user_prompt = Chat.objects.create(user=request.user, user_prompt = input, ai_response = prompt_result,archive_id = chat_archive,subject_id = subject)

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


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_chat_history(request):
    
    chat_history = ChatArchive.objects.all()
    serializer = ChatArchiveSerializer(chat_history, many = True)
    return Response(serializer.data,status= status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def store_answer(request):
    try:
       
        answers = {f"answer_{i}": request.data.get(f"q{i}") for i in range(1, 11)}
        
       
        user_survey = Survey.objects.create(user=request.user, **answers)
        
        return Response({"success": "Stored survey context"}, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({
            "error": "An error occurred while processing the prompt.",
            "details": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)