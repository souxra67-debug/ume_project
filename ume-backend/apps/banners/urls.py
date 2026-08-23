from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'banners', views.HeroBannerViewSet, basename='banner')

urlpatterns = [
    path('', include(router.urls)),
]