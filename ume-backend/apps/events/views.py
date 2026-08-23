from django.db.models import Q
from django.utils import timezone
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Event
from .serializers import EventSerializer


class IsAuthenticatedOrReadOnly(permissions.BasePermission):
    """Public GET, but create/update/delete require an authenticated (staff) user."""

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated)


class EventViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = "slug"

    def get_queryset(self):
        queryset = Event.objects.all()
        show_all = self.request.query_params.get("show_all") == "true"

        # Only authenticated (admin panel) requests may see unpublished/draft events.
        if not (show_all and self.request.user.is_authenticated):
            queryset = queryset.filter(is_published=True)

        return queryset

    @action(detail=False, methods=["get"], permission_classes=[permissions.AllowAny])
    def upcoming(self, request):
        """GET /api/events/upcoming/ — published events that haven't ended yet."""
        now = timezone.now()
        # Counts as upcoming if it hasn't ended, or (no end_date) hasn't started yet.
        queryset = (
            Event.objects.filter(is_published=True)
            .filter(Q(end_date__gte=now) | Q(end_date__isnull=True, event_date__gte=now))
            .order_by("event_date")[:6]
        )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)