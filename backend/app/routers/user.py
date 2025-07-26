from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import models, schemas, database, oauth2

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.get("/me", response_model=schemas.UserResponse)
def get_current_user(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(oauth2.get_current_user)
):
    return current_user
