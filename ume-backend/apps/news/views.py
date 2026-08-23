from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import NewsCategory, News
from .serializers import NewsCategorySerializer, NewsSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class NewsCategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = NewsCategory.objects.all()
    serializer_class = NewsCategorySerializer
    lookup_field = 'slug'


class NewsViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = News.objects.all()
        show_all = self.request.query_params.get('show_all', 'false')
        if show_all != 'true':
            queryset = queryset.filter(is_published=True)
        return queryset

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += 1
        instance.save(update_fields=['views'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=False)
    def featured(self, request):
        featured = self.get_queryset().filter(is_featured=True, is_published=True)[:6]
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)