import requests

def google_auth(code, CLIENT_ID, CLIENT_SECRET):
    try:
        token_url = "https://oauth2.googleapis.com/token"
        token_data = {
            'code': code,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'redirect_uri': 'http://localhost:5173',  
            'grant_type': 'authorization_code',
        }

        token_response = requests.post(token_url, data=token_data)
        
        if token_response.status_code != 200:
            raise Exception(f"Failed to obtain access token. Status code: {token_response.status_code}")
        
        token_info = token_response.json()
        access_token = token_info.get('access_token')

        userinfo_url = "https://www.googleapis.com/oauth2/v2/userinfo"
        headers = {"Authorization": f"Bearer {access_token}"}

        userinfo_response = requests.get(userinfo_url, headers=headers)
        
        if userinfo_response.status_code != 200:
            raise Exception(f"Failed to fetch user info. Status code: {userinfo_response.status_code}")
        
        user_info = userinfo_response.json()
        email = user_info.get('email')
        username = user_info.get('name')

        if not email or not username:
            raise Exception("Missing email or username from Google response")

        return email, username

    except Exception as e:
        print(f"Error in google_auth: {e}")
        return None, None
