from rest_framework import permissions, viewsets

from .models import GalleryImage
from .serializers import GalleryImageSerializer


class IsAuthenticatedOrReadOnly(permissions.BasePermission):
    """Public GET, but create/update/delete require an authenticated (staff) user."""

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated)


class GalleryImageViewSet(viewsets.ModelViewSet):
    serializer_class = GalleryImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = GalleryImage.objects.all()
        show_all = self.request.query_params.get("show_all") == "true"

        if not (show_all and self.request.user.is_authenticated):
            queryset = queryset.filter(is_published=True)

        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category=category)

        return queryset