from rest_framework import serializers

from .models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "id",
            "slug",
            "title_km",
            "title_en",
            "description_km",
            "description_en",
            "event_date",
            "end_date",
            "location_km",
            "location_en",
            "thumbnail",
            "is_published",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "slug", "created_at", "updated_at"]