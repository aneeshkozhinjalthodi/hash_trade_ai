from typing import Optional
from sqlalchemy.orm import Session
from app.auth.models import User, Role
from app.auth.schemas import UserCreate
from app.core.security import get_password_hash, verify_password

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        hashed_password=hashed_password,
        is_active=user.is_active,
        is_superuser=user.is_superuser,
    )
    # Assign Trader role by default if not superuser
    if not user.is_superuser:
        trader_role = db.query(Role).filter(Role.name == "Trader").first()
        if trader_role:
            db_user.roles.append(trader_role)
            
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user
