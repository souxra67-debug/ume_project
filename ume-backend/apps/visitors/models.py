from django.db import models


class Visitor(models.Model):
    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True
    )

    page = models.CharField(
        max_length=500,
        default="/"
    )

    user_agent = models.TextField(
        blank=True,
        null=True
    )

    referrer = models.URLField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.ip_address} - {self.page}"