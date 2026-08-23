from rest_framework import serializers

from .models import GalleryImage


class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = [
            "id",
            "title_km",
            "title_en",
            "category",
            "image",
            "is_published",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]