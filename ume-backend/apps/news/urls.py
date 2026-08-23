from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'news', views.NewsViewSet, basename='news')
router.register(r'news-categories', views.NewsCategoryViewSet, basename='news-category')
# events ត្រូវបានលុបចេញ — ព្រោះ apps.events ដោះស្រាយរួចហើយ នៅ /api/events/

urlpatterns = [
    path('', include(router.urls)),
]