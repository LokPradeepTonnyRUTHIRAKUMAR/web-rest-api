from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

import models
import crud
import schemas

from database import engine, SessionLocal, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

@app.post("/users")
def create_user(user: schemas.UserCreate,
                db: Session = Depends(get_db)):

    return crud.create_user(db, user.name, user.email)

@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    return crud.get_users(db)