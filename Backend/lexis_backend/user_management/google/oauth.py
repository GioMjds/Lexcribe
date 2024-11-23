import requests

def google_auth(code,clientID,clientSecret):
    
    token_url = "https://oauth2.googleapis.com/token"
    token_data = {
            'code': code,
            'client_id': clientID,
            'client_secret': clientSecret,
            'redirect_uri': 'http://localhost:5173',  
            'grant_type': 'authorization_code',
    }
    
    try:
      get_token = requests.post(token_url, data=token_data)
      token_info = get_token.json()
      access_token = token_info.get('access_token')
      
      userinfo_url = "https://www.googleapis.com/oauth2/v2/userinfo"
      headers = {
        "Authorization": f"Bearer {access_token}"   
      }
      
      userinfo_response = requests.post(userinfo_url, headers=headers)
      user_info = userinfo_response.json()
      email = user_info['email']
      username = user_info['name']
      
      return email, username
      
    except Exception as e:
        print(f"{e}")