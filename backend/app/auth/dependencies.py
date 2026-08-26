from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models import User, RevokedToken
from fastapi import Depends, HTTPException, status
from fastapi.security import  HTTPBearer, HTTPAuthorizationCredentials
import jwt
from app.auth.security import ALGORITHM, SECRET_KEY
from app.database import get_db


security = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
) -> User:
    
    token = credentials.credentials
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        jti = payload.get("jti")

        revoked_token = db.scalar(
            select(RevokedToken).where(RevokedToken.jti == jti)
        )

        if revoked_token:
            raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has been revoked",
        )

        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
            )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )

    user = db.get(User, int(user_id))
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    return user