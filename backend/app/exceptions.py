class AppException(Exception):
    def __init__(
        self,
        status_code: int,
        status_message: str,
        error_message: str,
    ):
        self.status_code = status_code
        self.status_message = status_message
        self.error_message = error_message


class NotFoundException(AppException):
    def __init__(
        self,
        error_message: str = "Resource not found",
    ):
        super().__init__(
            404,
            "Not Found",
            error_message,
        )


class BadRequestException(AppException):
    def __init__(
        self,
        error_message: str = "Bad request",
    ):
        super().__init__(
            400,
            "Bad Request",
            error_message,
        )


class UnauthorizedException(AppException):
    def __init__(
        self,
        error_message: str = "Unauthorized",
    ):
        super().__init__(
            401,
            "Unauthorized",
            error_message,
        )


class ForbiddenException(AppException):
    def __init__(
        self,
        error_message: str = "Forbidden",
    ):
        super().__init__(
            403,
            "Forbidden",
            error_message,
        )


class ConflictException(AppException):
    def __init__(
        self,
        error_message: str = "Conflict",
    ):
        super().__init__(
            409,
            "Conflict",
            error_message,
        )


class ValidationException(AppException):
    def __init__(
        self,
        error_message: str = "Validation error",
    ):
        super().__init__(
            422,
            "Validation Error",
            error_message,
        )
