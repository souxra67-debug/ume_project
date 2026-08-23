from django.db import models
from django.utils.text import slugify


class NewsCategory(models.Model):
    name_km = models.CharField(max_length=100)
    name_en = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True, max_length=120)

    class Meta:
        verbose_name_plural = 'News Categories'
        ordering = ['name_en']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name_en or self.name_km)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name_en or self.name_km


class News(models.Model):
    title_km = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True, max_length=280)
    excerpt_km = models.CharField(max_length=300, blank=True, default='')
    excerpt_en = models.CharField(max_length=300, blank=True, default='')
    content_km = models.TextField(blank=True, default='')
    content_en = models.TextField(blank=True, default='')
    thumbnail = models.ImageField(upload_to='news/thumbnails/', blank=True, null=True)
    category = models.ForeignKey(NewsCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='news_items')
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    published_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    views = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-published_at']
        verbose_name_plural = 'News'

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title_en or self.title_km)
            slug = base_slug
            counter = 1
            while News.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                counter += 1
                slug = f'{base_slug}-{counter}'
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title_en or self.title_km


# ✅ បន្ថែម Event Model
class Event(models.Model):
    title_km = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True, max_length=280)
    
    description_km = models.TextField(blank=True, default='')
    description_en = models.TextField(blank=True, default='')
    
    event_date = models.DateTimeField()
    end_date = models.DateTimeField(null=True, blank=True)
    
    location_km = models.CharField(max_length=300, blank=True, default='')
    location_en = models.CharField(max_length=300, blank=True, default='')
    
    thumbnail = models.ImageField(upload_to='events/thumbnails/', blank=True, null=True)
    
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['event_date']
        verbose_name_plural = 'Events'

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title_en or self.title_km)
            slug = base_slug
            counter = 1
            while Event.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                counter += 1
                slug = f'{base_slug}-{counter}'
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title_en or self.title_km