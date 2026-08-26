from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.auth.security import create_access_token
from app.auth.dependencies import get_current_user
from app.models import User

from app.services.auth_service import (
    create_user,
    update_user,
    authenticate_user,
    revoke_token,
    cleanup_revoked_tokens,
)

from app.schemas.auth import (
    UserCreate,
    UserUpdate,
    UserResponse,
    Token,
    LoginRequest,
)

from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
security = HTTPBearer()

router = APIRouter(
    prefix="/api/auth",
    tags=["Auth"]
)


@router.post("/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
def create_user_endpoint(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):
    try:
        return create_user(db, user_data) 
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )


@router.patch(
    "/me",
    response_model=UserResponse,
)
def update_user_endpoint(
    user_data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return update_user(
        db,
        current_user,
        user_data,
    )


@router.post("/login",
    response_model=Token,
    status_code=status.HTTP_200_OK
)
def login_user_endpoint(
    user_data: LoginRequest,
    db: Session = Depends(get_db)
):
    user = authenticate_user(db, user_data.email, user_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    access_token = create_access_token(user.id)

    return Token(access_token=access_token, token_type="bearer")


@router.post("/logout",status_code=status.HTTP_204_NO_CONTENT)
def logout_user_endpoint(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials
    cleanup_revoked_tokens(db)
    revoke_token(db, token)

    return None