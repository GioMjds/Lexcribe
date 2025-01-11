import google.generativeai as genai
import os
from dotenv import load_dotenv

from ai_service.models import Chat ,ChatArchive
load_dotenv()

def send_user_prompt(prompt):
    """
    Sends a prompt to the AI with a specific instruction to act as a lawyer specializing in Philippine laws,
    responding concisely to the user's query.
    
    Args:
        prompt (str): The user's main query.
    
    Returns:
        str: The AI-generated response.
    """
    
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

    
    context = (
        "You are a lawyer in the Philippines. Respond strictly based on Philippine laws "
        "and legal practices. Provide concise and specific answers. Avoid referencing laws "
        "from other countries unless explicitly requested."
    )

    try:
        # Combine context with user prompt
        full_prompt = f"{context}\n\nUser's Query: {prompt}\n\nAnswer concisely:"
        
        response = chat_session.send_message(full_prompt)
        result = response.text.strip()  # Remove unnecessary whitespace
        print(result)
        return result

    except Exception as e:
        if '429' in str(e):     
            print(f"Rate limit error: {e}")
        else:
            print(f"Error: {e}")
        return "Error occurred while generating the response."
