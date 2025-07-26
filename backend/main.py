from fastapi import FastAPI, Depends
from app import models
from app.database import engine
from app.routers import auth
from app.oauth2 import get_current_user
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://quiz-app-one-omega-83.vercel.app"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


models.Base.metadata.create_all(bind=engine)

app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Server is running 🚀"}

@app.get("/protected")
def protected_route(current_user: models.User = Depends(get_current_user)):
    print("✅ /protected route hit. Current user:", current_user)
    if not current_user:
        return {"error": "User not found"}
    return {"message": "Token is valid ✅", "user": current_user.email}