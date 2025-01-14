import google.generativeai as genai
import os
from dotenv import load_dotenv
from ai_service.models import Survey

load_dotenv()

def send_user_prompt(prompt, user_id):
    """
    Sends a prompt to the AI with a specific instruction to act as a lawyer specializing in Philippine laws,
    responding concisely to the user's query. It customizes the AI's response based on the user's survey answers.
    
    Args:
        prompt (str): The user's main query.
        user_id (int): The ID of the user to retrieve their survey answers.
    
    Returns:
        str: The AI-generated response.
    """
    int_user_id = int(user_id)
    survey = Survey.objects.get(user_id=int_user_id)  
    
  
    genai.configure(api_key=os.getenv("API_KEY"))  
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }
    
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
    )
    
    chat_session = model.start_chat(history=[])
    
    # Build context based on user's survey answers
    context = (
        "You are a lawyer in the Philippines. Respond strictly based on Philippine laws and legal practices. "
        "Provide concise and specific answers. Avoid referencing laws from other countries unless explicitly requested.\n\n"
        
        # Question 1: How do you prefer to learn new legal concepts?
        f"1. The user prefers to learn new legal concepts by: {survey.answer_1}\n"
        
        # Question 2: For complex legal concepts, what helps you understand best?
        f"2. To understand complex legal concepts, the user finds the following most helpful: {survey.answer_2}\n"
        
        # Question 3: How would you like legal concepts explained? eg. with sub question 
        f"3. The user prefers legal concepts to be explained in the following manner: {survey.answer_3}\n"
                
        # Question 4: How would you like information organized?
        f"5. The user prefers information to be organized in the following structure: {survey.answer_4}\n"
        
        # Question 5: Preferred language for explanations
        f"6. The user prefers the language of explanation to be: {survey.answer_5}\n"
        
        # Question 6: How would you like the AI to interact with you?
        f"7. The user prefers the AI to interact in the following style: {survey.answer_6}\n"
        
        # Question 7: What types of practice exercises do you prefer?
        f"8. The user prefers the following types of practice exercises: {survey.answer_7}\n"
        
        # Question 8: How much guidance do you prefer?
        f"9. The user prefers the following level of guidance: {survey.answer_8}\n"
        
        # Question 9: How do you best memorize legal concepts?
        f"10. The user best memorizes legal concepts through: {survey.answer_9}\n"
        
        # Question 10: What helps you reinforce your learning?
        f"11. The user finds the following most helpful for reinforcing learning: {survey.answer_10}\n\n"
        
        "Please respond to the user’s query based on these preferences and the context of Philippine law."
    )

    
    try:
       
        full_prompt = f"{context}\n\nUser's Query: {prompt}\n\nAnswer concisely:"
        
       
        response = chat_session.send_message(full_prompt)
        result = response.text.strip()  

        return result

    except Exception as e:
        if '429' in str(e):     
            print(f"Rate limit error: {e}")
        else:
            print(f"Error: {e}")
        return "Error occurred while generating the response."
