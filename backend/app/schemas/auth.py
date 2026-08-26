from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime

class UserCreate(BaseModel):
    name: str = Field(min_length=1, max_length=50)
    email: str = Field(min_length=5, max_length=100)
    password: str = Field(min_length=8, max_length=128)

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class LoginRequest(BaseModel):
    email: str = Field(min_length=5, max_length=100)
    password: str = Field(min_length=8, max_length=128)

class Token(BaseModel) :
    access_token: str
    token_type: str = "bearer"