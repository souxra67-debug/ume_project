import uuid

from django.db import models
from django.utils.text import slugify


class Event(models.Model):
    title_km = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255)
    slug = models.SlugField(max_length=280, unique=True, blank=True)

    description_km = models.TextField(blank=True)
    description_en = models.TextField(blank=True)

    event_date = models.DateTimeField(help_text="Start date/time of the event.")
    end_date = models.DateTimeField(null=True, blank=True)

    location_km = models.CharField(max_length=255, blank=True)
    location_en = models.CharField(max_length=255, blank=True)

    thumbnail = models.ImageField(upload_to="events/", blank=True, null=True)

    is_published = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-event_date"]

    def __str__(self):
        return self.title_en or self.title_km

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title_en or self.title_km) or "event"
            slug = base
            # Guarantee uniqueness without an extra DB round trip per collision.
            if Event.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{uuid.uuid4().hex[:6]}"
            self.slug = slug
        super().save(*args, **kwargs)