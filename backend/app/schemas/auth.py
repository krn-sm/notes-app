from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
    field_validator,
)


class UserCreate(BaseModel):
    name: str = Field(
        min_length=1,
        max_length=50,
    )
    email: EmailStr
    password: str = Field(
        min_length=8,
        max_length=128,
    )

    @field_validator("name")
    def validate_name(
        cls,
        value: str,
    ) -> str:
        name = value.strip()

        if not name[0].isalpha():
            raise ValueError(
                "Name must start with a letter"
            )

        return name


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )


class UserUpdate(BaseModel):
    name: str = Field(
        min_length=1,
        max_length=50,
    )

    @field_validator("name")
    def validate_name(
        cls,
        value: str,
    ) -> str:
        name = value.strip()

        if not name[0].isalpha():
            raise ValueError(
                "Name must start with a letter"
            )

        return name


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(
        min_length=8,
        max_length=128,
    )
