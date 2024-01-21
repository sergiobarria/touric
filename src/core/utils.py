from rest_framework import status
from rest_framework.response import Response


def api_response(
    data=None, status_code=status.HTTP_200_OK, success=True, message=None, errors=None
):
    """Utility function to return a consistent API response"""

    response_data = {
        "success": success,
        "code": status_code,
        "data": data,
    }

    if isinstance(data, list) and len(data) > 0:
        response_data["results"] = len(data)

    if message:
        response_data["message"] = message

    if errors:
        response_data["errors"] = errors

    return Response(response_data, status=status_code)
