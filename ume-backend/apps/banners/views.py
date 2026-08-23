from rest_framework import viewsets, parsers
from rest_framework.permissions import AllowAny
from .models import HeroBanner
from .serializers import HeroBannerSerializer


class HeroBannerViewSet(viewsets.ModelViewSet):
    queryset = HeroBanner.objects.all()
    serializer_class = HeroBannerSerializer
    permission_classes = [AllowAny]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser, parsers.JSONParser]

    def get_queryset(self):
        queryset = HeroBanner.objects.all()
        show_all = self.request.query_params.get('show_all', 'false')
        if show_all != 'true':
            queryset = queryset.filter(is_active=True)
        return queryset