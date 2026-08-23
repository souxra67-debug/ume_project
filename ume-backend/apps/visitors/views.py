from datetime import timedelta

from django.utils import timezone
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Visitor
from .serializers import VisitorSerializer


def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0].strip()
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip


class TrackVisitorView(CreateAPIView):
    queryset = Visitor.objects.all()
    serializer_class = VisitorSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        page = request.data.get("page", "/")

        visitor = Visitor.objects.create(
            ip_address=get_client_ip(request),
            page=page,
            user_agent=request.META.get("HTTP_USER_AGENT", ""),
            referrer=request.META.get("HTTP_REFERER"),
        )

        serializer = self.get_serializer(visitor)

        return Response(
            {
                "success": True,
                "message": "Visitor tracked successfully.",
                "visitor": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )


class StatsSummaryView(APIView):
    """
    GET /api/stats/summary/
    Returns visitor counts for today, this week, this month, and all-time.
    Requires an authenticated (admin) user, since this is dashboard-only data.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        now = timezone.now()
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        week_start = today_start - timedelta(days=today_start.weekday())
        month_start = today_start.replace(day=1)

        base_qs = Visitor.objects.all()

        data = {
            "today_visitors": base_qs.filter(created_at__gte=today_start).count(),
            "week_visitors": base_qs.filter(created_at__gte=week_start).count(),
            "month_visitors": base_qs.filter(created_at__gte=month_start).count(),
            "total_visitors": base_qs.count(),
        }

        return Response(data, status=status.HTTP_200_OK)