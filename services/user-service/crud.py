import models
from sqlalchemy.orm import Session

def create_user(db: Session, name: str, email: str):
    user = models.User(name=name, email=email)

    db.add(user)
    db.commit()
    db.refresh(user)

    return user

def get_users(db: Session):
    return db.query(models.User).all()