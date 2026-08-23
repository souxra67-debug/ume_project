from django.db import models


class GalleryImage(models.Model):
    title_km = models.CharField(max_length=255, blank=True)
    title_en = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=100, blank=True)

    image = models.ImageField(upload_to="gallery/")

    is_published = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title_en or self.title_km or f"Gallery image #{self.pk}"