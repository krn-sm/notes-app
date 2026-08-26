from fastapi import APIRouter, Depends, Cookie, HTTPException, Response, status
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
    LoginRequest,
)

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
    status_code=status.HTTP_204_NO_CONTENT
)
def login_user_endpoint(
    response: Response,
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

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=900,
    )

    return None


@router.post(
    "/logout",
    status_code=status.HTTP_204_NO_CONTENT
)
def logout_user_endpoint(
    response: Response,
    access_token: str | None = Cookie(default=None),
    db: Session = Depends(get_db),
):
    if access_token is not None:
        cleanup_revoked_tokens(db)
        revoke_token(db, access_token)

    response.delete_cookie(
        key="access_token",
    )

    return None