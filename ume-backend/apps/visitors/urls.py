from django.urls import path

from .views import TrackVisitorView


urlpatterns = [
    path(
        "track/",
        TrackVisitorView.as_view(),
        name="track-visitor",
    ),
]