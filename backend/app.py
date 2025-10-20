from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import databases
import sqlalchemy
from datetime import datetime
import os
from dotenv import load_dotenv
import razorpay
import json
import uuid

load_dotenv()

# Database Configuration
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/training_db")
database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()

# Razorpay Configuration
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID", "rzp_test_RTzZoniikjjjjsim7KO")
RAZORPAY_SECRET_KEY = os.getenv("RAZORPAY_SECRET_KEY", "kkk")
client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_SECRET_KEY))

# Database Models
courses = sqlalchemy.Table(
    "courses",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("title", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("description", sqlalchemy.Text),
    sqlalchemy.Column("duration", sqlalchemy.String),
    sqlalchemy.Column("level", sqlalchemy.String),
    sqlalchemy.Column("mode", sqlalchemy.String),
    sqlalchemy.Column("price", sqlalchemy.Float),
    sqlalchemy.Column("badge", sqlalchemy.String),
    sqlalchemy.Column("features", sqlalchemy.JSON),
    sqlalchemy.Column("icon", sqlalchemy.String),
    sqlalchemy.Column("color", sqlalchemy.String),
    sqlalchemy.Column("difficulty", sqlalchemy.Integer),
    sqlalchemy.Column("created_at", sqlalchemy.DateTime, default=datetime.utcnow),
)

enrollments = sqlalchemy.Table(
    "enrollments",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("enrollment_id", sqlalchemy.String, unique=True, nullable=False),
    sqlalchemy.Column("course_id", sqlalchemy.Integer, sqlalchemy.ForeignKey("courses.id")),
    sqlalchemy.Column("first_name", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("last_name", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("email", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("phone", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("education", sqlalchemy.String),
    sqlalchemy.Column("experience", sqlalchemy.String),
    sqlalchemy.Column("start_date", sqlalchemy.Date),
    sqlalchemy.Column("preferred_time", sqlalchemy.String),
    sqlalchemy.Column("custom_features", sqlalchemy.JSON),
    sqlalchemy.Column("total_amount", sqlalchemy.Float),
    sqlalchemy.Column("status", sqlalchemy.String, default="pending"),
    sqlalchemy.Column("created_at", sqlalchemy.DateTime, default=datetime.utcnow),
)

payments = sqlalchemy.Table(
    "payments",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("enrollment_id", sqlalchemy.String, sqlalchemy.ForeignKey("enrollments.enrollment_id")),
    sqlalchemy.Column("razorpay_order_id", sqlalchemy.String),
    sqlalchemy.Column("razorpay_payment_id", sqlalchemy.String),
    sqlalchemy.Column("razorpay_signature", sqlalchemy.String),
    sqlalchemy.Column("amount", sqlalchemy.Float),
    sqlalchemy.Column("status", sqlalchemy.String, default="pending"),
    sqlalchemy.Column("payment_method", sqlalchemy.String),
    sqlalchemy.Column("created_at", sqlalchemy.DateTime, default=datetime.utcnow),
)

engine = sqlalchemy.create_engine(DATABASE_URL)
metadata.create_all(engine)

# Pydantic Models
class CourseBase(BaseModel):
    title: str
    description: str
    duration: str
    level: str
    mode: str
    price: float
    badge: Optional[str] = None
    features: List[str]
    icon: str
    color: str
    difficulty: int

class Course(CourseBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class EnrollmentBase(BaseModel):
    course_id: int
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    education: str
    experience: str
    start_date: str
    preferred_time: str
    custom_features: List[str]
    total_amount: float
    payment_method: str

class EnrollmentCreate(EnrollmentBase):
    pass

class Enrollment(EnrollmentBase):
    id: int
    enrollment_id: str
    status: str
    created_at: datetime

    class Config:
        orm_mode = True

class PaymentOrder(BaseModel):
    amount: int
    currency: str = "INR"
    receipt: str
    notes: dict

class PaymentVerification(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    enrollment_id: str

# FastAPI App
app = FastAPI(title="Training API", version="1.0.0")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

# Startup/Shutdown Events
@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# Routes
@app.get("/")
async def root():
    return {"message": "Training API is running"}

@app.get("/api/courses", response_model=List[Course])
async def get_courses():
    query = courses.select()
    result = await database.fetch_all(query)
    return result

@app.get("/api/courses/{course_id}", response_model=Course)
async def get_course(course_id: int):
    query = courses.select().where(courses.c.id == course_id)
    course = await database.fetch_one(query)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@app.post("/api/enrollments", response_model=Enrollment)
async def create_enrollment(enrollment: EnrollmentCreate):
    enrollment_id = f"ENR-{uuid.uuid4().hex[:8].upper()}"
    
    query = enrollments.insert().values(
        enrollment_id=enrollment_id,
        course_id=enrollment.course_id,
        first_name=enrollment.first_name,
        last_name=enrollment.last_name,
        email=enrollment.email,
        phone=enrollment.phone,
        education=enrollment.education,
        experience=enrollment.experience,
        start_date=enrollment.start_date,
        preferred_time=enrollment.preferred_time,
        custom_features=enrollment.custom_features,
        total_amount=enrollment.total_amount,
        status="pending"
    )
    
    last_record_id = await database.execute(query)
    
    # Return the created enrollment
    select_query = enrollments.select().where(enrollments.c.id == last_record_id)
    result = await database.fetch_one(select_query)
    
    return result

@app.post("/api/create-order")
async def create_payment_order(order: PaymentOrder):
    try:
        order_data = {
            "amount": order.amount * 100,  # Razorpay expects amount in paise
            "currency": order.currency,
            "receipt": order.receipt,
            "notes": order.notes
        }
        
        razorpay_order = client.order.create(order_data)
        return {
            "id": razorpay_order["id"],
            "entity": razorpay_order["entity"],
            "amount": razorpay_order["amount"],
            "currency": razorpay_order["currency"],
            "receipt": razorpay_order["receipt"],
            "status": razorpay_order["status"],
            "notes": razorpay_order["notes"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/verify-payment")
async def verify_payment(payment: PaymentVerification):
    try:
        # Verify the payment signature
        params_dict = {
            'razorpay_order_id': payment.razorpay_order_id,
            'razorpay_payment_id': payment.razorpay_payment_id,
            'razorpay_signature': payment.razorpay_signature
        }
        
        client.utility.verify_payment_signature(params_dict)
        
        # Update payment status in database
        query = payments.insert().values(
            enrollment_id=payment.enrollment_id,
            razorpay_order_id=payment.razorpay_order_id,
            razorpay_payment_id=payment.razorpay_payment_id,
            razorpay_signature=payment.razorpay_signature,
            amount=0,  # Will be updated from order
            status="completed"
        )
        await database.execute(query)
        
        # Update enrollment status
        update_query = enrollments.update().where(
            enrollments.c.enrollment_id == payment.enrollment_id
        ).values(status="confirmed")
        await database.execute(update_query)
        
        return {"status": "success", "message": "Payment verified successfully"}
    
    except razorpay.errors.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid payment signature")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/enrollments/{enrollment_id}")
async def get_enrollment(enrollment_id: str):
    query = enrollments.select().where(enrollments.c.enrollment_id == enrollment_id)
    result = await database.fetch_one(query)
    if not result:
        raise HTTPException(status_code=404, detail="Enrollment not found")
    return result

# Seed initial courses
@app.post("/api/seed-courses")
async def seed_courses():
    initial_courses = [
        {
            "title": "Full Stack Web Development",
            "description": "Master modern web technologies including HTML5, CSS3, JavaScript, React, and Node.js",
            "duration": "3 months",
            "level": "Beginner to Advanced",
            "mode": "Online/Offline",
            "price": 999.0,
            "badge": "Most Popular",
            "features": ["Live Projects", "Mentorship", "Job Assistance"],
            "icon": "FaCode",
            "color": "bg-gradient-to-br from-blue-500 to-blue-700",
            "difficulty": 3
        },
        {
            "title": "Mobile App Development",
            "description": "Learn to build native and cross-platform mobile applications for iOS and Android",
            "duration": "4 months",
            "level": "Intermediate",
            "mode": "Online/Offline",
            "price": 1299.0,
            "badge": "Advanced",
            "features": ["App Store Deployment", "UI/UX Design", "Performance Optimization"],
            "icon": "FaMobileAlt",
            "color": "bg-gradient-to-br from-purple-500 to-purple-700",
            "difficulty": 4
        },
        {
            "title": "Digital Marketing & SEO",
            "description": "Master the art of digital marketing, SEO, social media, and content strategy",
            "duration": "2 months",
            "level": "Beginner to Intermediate",
            "mode": "Online",
            "price": 799.0,
            "badge": "Fast Track",
            "features": ["Google Analytics", "Social Media Tools", "Content Strategy"],
            "icon": "FaSearch",
            "color": "bg-gradient-to-br from-green-500 to-green-700",
            "difficulty": 2
        },
        {
            "title": "UI/UX Design",
            "description": "Create stunning user interfaces and exceptional user experiences with modern design tools",
            "duration": "3 months",
            "level": "Beginner to Advanced",
            "mode": "Online/Offline",
            "price": 899.0,
            "badge": "Creative",
            "features": ["Figma Mastery", "Prototyping", "Design Systems"],
            "icon": "FaPaintBrush",
            "color": "bg-gradient-to-br from-pink-500 to-pink-700",
            "difficulty": 3
        }
    ]
    
    for course_data in initial_courses:
        query = courses.insert().values(**course_data)
        await database.execute(query)
    
    return {"message": "Courses seeded successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)