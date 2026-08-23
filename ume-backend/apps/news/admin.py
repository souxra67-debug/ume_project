from django.contrib import admin
from .models import NewsCategory, News, Event


@admin.register(NewsCategory)
class NewsCategoryAdmin(admin.ModelAdmin):
    list_display = ['name_en', 'name_km', 'slug']
    search_fields = ['name_en', 'name_km']


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ['title_en', 'category', 'is_published', 'is_featured', 'published_at', 'views']
    list_filter = ['is_published', 'is_featured', 'category']
    list_editable = ['is_published', 'is_featured']
    search_fields = ['title_en', 'title_km']
    date_hierarchy = 'published_at'


# ✅ បន្ថែម Event Admin
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title_en', 'event_date', 'location_en', 'is_published', 'created_at']
    list_filter = ['is_published']
    list_editable = ['is_published']
    search_fields = ['title_en', 'title_km', 'location_en']
    date_hierarchy = 'event_date'