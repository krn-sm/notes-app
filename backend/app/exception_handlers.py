from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import (
    RequestValidationError,
)
from starlette.exceptions import (
    HTTPException as StarletteHTTPException,
)

from app.schemas.response import ApiResponse
from app.exceptions import AppException


def create_error_response(
    status_code: int,
    status_message: str,
    error_message: str,
) -> JSONResponse:
    response = ApiResponse(
        status_code=status_code,
        status_message=status_message,
        error_message=error_message,
        response_data=None,
    )
    return JSONResponse(
        content=response.model_dump(),
        status_code=status_code,
    )


async def app_exception_handler(
    request: Request,
    exc: AppException,
) -> JSONResponse:
    return create_error_response(
        exc.status_code,
        exc.status_message,
        exc.error_message,
    )


async def http_exception_handler(
    request: Request,
    exc: StarletteHTTPException,
) -> JSONResponse:
    return create_error_response(
        exc.status_code,
        "Error",
        str(exc.detail),
    )


async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError,
) -> JSONResponse:
    errors = []
    for error in exc.errors():
        field = ".".join(
            str(loc)
            for loc in error["loc"]
            if loc != "body"
        )
        msg = error["msg"]
        errors.append(
            f"{field}: {msg}" if field else msg
        )
    return create_error_response(
        422,
        "Validation Error",
        "; ".join(errors),
    )


async def generic_exception_handler(
    request: Request,
    exc: Exception,
) -> JSONResponse:
    return create_error_response(
        500,
        "Internal Server Error",
        "An unexpected error occurred",
    )


def register_exception_handlers(app):
    app.add_exception_handler(
        AppException,
        app_exception_handler,
    )
    app.add_exception_handler(
        StarletteHTTPException,
        http_exception_handler,
    )
    app.add_exception_handler(
        RequestValidationError,
        validation_exception_handler,
    )
    app.add_exception_handler(
        Exception,
        generic_exception_handler,
    )
