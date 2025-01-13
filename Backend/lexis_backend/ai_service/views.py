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
        chat_archive =  ChatArchive.objects.create(user = request.user, prompt_title = prompt_title)
        

        if input is None:
            return Response({"error": "Prompt must not be empty"}, status=status.HTTP_403_FORBIDDEN)
        
    
        subject = Subjects.objects.get(subject =  "General")
            

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
        # Check if the user has already submitted a survey
        existing_survey = Survey.objects.filter(user=request.user).first()
        
        if existing_survey:
            return Response({"error": "You have already submitted your survey."}, status=status.HTTP_400_BAD_REQUEST)

        store_answer = [{f"answer_{key}": value} for key, value in request.data.items()]

        parse_answer_q3 = f"{store_answer[2]['answer_q3']['main']},{store_answer[2]['answer_q3']['q3_sub']}"

        user_survey = Survey.objects.create(
            user=request.user,
            answer_1=store_answer[0]['answer_q1'],
            answer_2=store_answer[1]['answer_q2'],
            answer_3=parse_answer_q3,
            answer_4=store_answer[3]['answer_q4'],
            answer_5=store_answer[4]['answer_q5'],
            answer_6=store_answer[5]['answer_q6'],
            answer_7=store_answer[6]['answer_q7'],
            answer_8=store_answer[7]['answer_q8'],
            answer_9=store_answer[8]['answer_q9'],
            answer_10=store_answer[9]['answer_q10'],
        )
        
        if user_survey:
            return Response({"success": "Stored survey context"}, status=status.HTTP_200_OK)
        
        return Response({"error": "Missing fields"}, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        print(e)
        return Response({
            "error": "An error occurred while processing the prompt.",
            "details": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
