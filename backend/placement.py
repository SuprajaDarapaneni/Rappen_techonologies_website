# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RegistrationRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    course: str
    experience: str
    message: Optional[str] = None

def send_email(user_data: RegistrationRequest):
    # Email configuration
    sender_email = os.getenv("SENDER_EMAIL", "your-email@example.com")
    sender_password = os.getenv("SENDER_PASSWORD", "your-app-password")
    smtp_server = "smtp.gmail.com"
    smtp_port = 587

    # Create message
    message = MIMEMultipart("alternative")
    message["Subject"] = "New Registration - Rapen Technologies Placement Program"
    message["From"] = sender_email
    message["To"] = sender_email  # Send to yourself

    # Email body
    text = f"""
    New Registration Details:
    
    Name: {user_data.name}
    Email: {user_data.email}
    Phone: {user_data.phone}
    Course: {user_data.course}
    Experience: {user_data.experience}
    Message: {user_data.message or 'No message provided'}
    """

    html = f"""
    <html>
    <body>
        <h2>New Registration - Rapen Technologies</h2>
        <table style="border-collapse: collapse; width: 100%;">
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">{user_data.name}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">{user_data.email}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">{user_data.phone}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Course:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">{user_data.course}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Experience:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">{user_data.experience}</td>
            </tr>
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Message:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">{user_data.message or 'No message provided'}</td>
            </tr>
        </table>
    </body>
    </html>
    """

    # Attach parts
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")
    message.attach(part1)
    message.attach(part2)

    # Send email
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, sender_email, message.as_string())
        server.quit()
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

@app.post("/api/register")
async def register_user(registration: RegistrationRequest):
    try:
        # Send email notification
        email_sent = send_email(registration)
        
        if not email_sent:
            raise HTTPException(status_code=500, detail="Failed to send notification email")
        
        # Here you can also save the data to a database
        # For example: save_to_database(registration)
        
        return {"message": "Registration successful", "status": "success"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Rapen Technologies Placement API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
    fastapi==0.104.1
uvicorn==0.24.0
python-multipart==0.0.6
pydantic[email]==2.5.0
python-dotenv==1.0.0