import os
from datetime import datetime, timedelta, timezone

import jwt
from fastapi import Depends, HTTPException, Response, status
from fastapi.security import APIKeyCookie
from pydantic import BaseModel

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-insecure-secret-change-me")
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_HOURS = 24

APP_USER_EMAIL = os.getenv("APP_USER_EMAIL", "test@test.com")
APP_USER_PASSWORD = os.getenv("APP_USER_PASSWORD", "test")

COOKIE_NAME = "access_token"

cookie_scheme = APIKeyCookie(name=COOKIE_NAME, auto_error=False)


class LoginRequest(BaseModel):
    email: str
    password: str


def authenticate(email: str, password: str) -> str:
    if email != APP_USER_EMAIL or password != APP_USER_PASSWORD:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    expire = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRY_HOURS)
    return jwt.encode({"sub": email, "exp": expire}, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


def set_auth_cookie(response: Response, token: str) -> None:
    # samesite="lax" is enough because the frontend proxies /api/* to this
    # backend (see front-end/netlify.toml and vite.config.js), so the browser
    # always sees this as a same-origin request, not a cross-site one.
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=JWT_EXPIRY_HOURS * 3600,
        path="/",
    )


def clear_auth_cookie(response: Response) -> None:
    response.delete_cookie(key=COOKIE_NAME, path="/")


def get_current_user(token: str | None = Depends(cookie_scheme)) -> str:
    if token is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")

    return payload["sub"]
