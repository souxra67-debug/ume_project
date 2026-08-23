from rest_framework import serializers

from .models import Visitor


class VisitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitor
        fields = [
            "id",
            "ip_address",
            "page",
            "user_agent",
            "referrer",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "ip_address",
            "user_agent",
            "referrer",
            "created_at",
        ]