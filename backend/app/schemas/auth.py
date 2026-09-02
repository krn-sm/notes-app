from pydantic import BaseModel, ConfigDict, Field, field_validator, EmailStr
from datetime import datetime

class UserCreate(BaseModel):
    name: str = Field(min_length=1, max_length=50)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)

    @field_validator("name")
    def validate_name(cls, value: str) -> str:
        name = value.strip()
        if not name:
            raise ValueError("Name must not be empty")
        if len(name) > 50:
            raise ValueError("Name must not exceed 50 characters")
        if not name[0].isalpha():
            raise ValueError("Name must start with a letter")
        return name

    @field_validator("password")
    def validate_password(cls, value: str) -> str:
        password = value.strip()
        if not password:
            raise ValueError("Password must not be empty")
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if len(password) > 128:
            raise ValueError("Password must not exceed 128 characters")
        return password
    

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)

class UserUpdate(BaseModel):
    name: str = Field(
        min_length=1,
        max_length=50,
    )
    @field_validator("name")
    def validate_name(cls, value: str) -> str:
        name = value.strip()
        if not name:
            raise ValueError("Name must not be empty")
        if len(name) > 50:
            raise ValueError("Name must not exceed 50 characters")
        if not name[0].isalpha():
            raise ValueError("Name must start with a letter")
        return name

class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)

class Token(BaseModel) :
    access_token: str
    token_type: str = "bearer"