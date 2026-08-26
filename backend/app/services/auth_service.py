from sqlalchemy.orm import Session
from app.models import User, RevokedToken
from app.schemas.auth import UserCreate
from app.auth.security import hash_password, verify_password, ALGORITHM, SECRET_KEY
from sqlalchemy import delete, select
from datetime import datetime, timezone
import jwt

def create_user(
    db: Session,
    user_data: UserCreate,
) -> User:
    
    existing_user = db.scalar(
        select(User).where(User.email == user_data.email)
    )

    if existing_user:
        raise ValueError("Email already registered")
    
    hashed_password = hash_password(user_data.password)
    user = User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=hashed_password,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def authenticate_user(
    db: Session,
    email: str,
    password: str,
) -> User | None:
    
    existing_user = db.scalar(
        select(User).where(User.email == email)
    )
    if existing_user and verify_password(
    password,
    existing_user.hashed_password,
    ):
        return existing_user

    return None


def revoke_token(
    db: Session,
    token: str,
) -> None:
        
    payload = jwt.decode(
        token,
        SECRET_KEY,
        algorithms=[ALGORITHM],
    )

    jti = payload.get("jti")
    exp = payload.get("exp")

    if jti is None or exp is None:
        raise ValueError("Invalid token")

    revoked_token = RevokedToken(
        jti=jti,
        expires_at=datetime.fromtimestamp(exp, tz=timezone.utc),
    )

    db.add(revoked_token)
    db.commit()


def cleanup_revoked_tokens(db: Session) -> None:
    db.execute(
        delete(RevokedToken).where(
            RevokedToken.expires_at < datetime.now(timezone.utc)
        )
    )
    db.commit()