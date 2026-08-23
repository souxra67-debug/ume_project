from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/banners/', include('apps.banners.urls')),
    path('api/', include('apps.news.urls')),          # ← ប្តូរពី 'api/news/' ទៅ 'api/'
    path('api/auth/', include('apps.account.urls')),
    path('api/visitors/', include('apps.visitors.urls')),
    path('api/events/', include('apps.events.urls')),
    path('api/gallery/', include('apps.gallery.urls')),
    path("api/stats/", include("apps.visitors.stats_urls")),

    # API documentation
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)