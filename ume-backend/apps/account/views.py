from django.conf import settings
from django.contrib.auth import authenticate
from drf_spectacular.utils import OpenApiExample, OpenApiResponse, extend_schema
from rest_framework import serializers, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
 
from .serializers import LoginSerializer, UserSerializer


def _tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    }


class LoginView(APIView):
    """
    POST /api/auth/login/
    Body: { "username": "...", "password": "..." }

    Returns a shape the React AuthContext can consume directly:
      { "success": true, "token": {...}, "user": {...} }
      { "success": false, "message": "..." }
    """
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "login"

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"success": False, "message": "Please enter both username and password."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]

        user = authenticate(request, username=username, password=password)

        if user is None:
            return Response(
                {"success": False, "message": "Invalid username or password."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not user.is_active:
            return Response(
                {"success": False, "message": "This account has been disabled."},
                status=status.HTTP_403_FORBIDDEN,
            )

        if getattr(settings, "ADMIN_LOGIN_REQUIRES_STAFF", True) and not user.is_staff:
            return Response(
                {"success": False, "message": "You do not have access to the admin panel."},
                status=status.HTTP_403_FORBIDDEN,
            )

        if not getattr(user, "is_active_admin", True):
            return Response(
                {"success": False, "message": "This admin account has been deactivated."},
                status=status.HTTP_403_FORBIDDEN,
            )

        return Response(
            {
                "success": True,
                "token": _tokens_for_user(user),
                "user": UserSerializer(user).data,
            },
            status=status.HTTP_200_OK,
        )


class LogoutView(APIView):
 
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response(
                {"success": False, "message": "Refresh token is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception:
            return Response(
                {"success": False, "message": "Invalid or already-expired token."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response({"success": True}, status=status.HTTP_200_OK)


class MeView(APIView):
   
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"success": True, "user": UserSerializer(request.user).data})