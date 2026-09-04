from fastapi import (
    APIRouter,
    Depends,
    Cookie,
    Response,
    status,
)

from sqlalchemy.orm import Session

from app.database import get_db
from app.auth.security import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    create_access_token,
)
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
from app.schemas.response import ApiResponse
from app.exceptions import UnauthorizedException


router = APIRouter(
    prefix="/api/auth",
    tags=["Auth"],
)


@router.post(
    "/register",
    response_model=ApiResponse[UserResponse],
    status_code=status.HTTP_201_CREATED,
)
def create_user_endpoint(
    user_data: UserCreate,
    db: Session = Depends(get_db),
):
    user = create_user(
        db,
        user_data,
    )
    return ApiResponse(
        status_code=201,
        status_message="User registered successfully",
        response_data=user,
    )


@router.get(
    "/me",
    response_model=ApiResponse[UserResponse],
)
def get_current_user_endpoint(
    current_user: User = Depends(get_current_user),
):
    return ApiResponse(
        status_code=200,
        status_message="User retrieved successfully",
        response_data=current_user,
    )


@router.patch(
    "/me",
    response_model=ApiResponse[UserResponse],
)
def update_user_endpoint(
    user_data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user = update_user(
        db,
        current_user,
        user_data,
    )
    return ApiResponse(
        status_code=200,
        status_message="User updated successfully",
        response_data=user,
    )


@router.post(
    "/login",
    response_model=ApiResponse[None],
)
def login_user_endpoint(
    response: Response,
    user_data: LoginRequest,
    db: Session = Depends(get_db),
):
    user = authenticate_user(
        db,
        user_data.email,
        user_data.password,
    )

    if not user:
        raise UnauthorizedException(
            "Invalid email or password"
        )

    access_token = create_access_token(
        user.id,
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )

    return ApiResponse(
        status_code=200,
        status_message="Login successful",
        response_data=None,
    )


@router.post(
    "/logout",
    response_model=ApiResponse[None],
)
def logout_user_endpoint(
    response: Response,
    access_token: str | None = Cookie(
        default=None,
    ),
    db: Session = Depends(get_db),
):
    if access_token is not None:
        cleanup_revoked_tokens(db)

        revoke_token(
            db,
            access_token,
        )

    response.delete_cookie(
        key="access_token",
    )

    return ApiResponse(
        status_code=200,
        status_message="Logout successful",
        response_data=None,
    )
