from django.contrib import admin
from .models import HeroBanner


@admin.register(HeroBanner)
class HeroBannerAdmin(admin.ModelAdmin):
    list_display = ['id', 'title_en', 'order', 'is_active', 'created_at']
    list_editable = ['order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['title_en', 'title_km']
    ordering = ['order', '-created_at']
    
    fieldsets = (
        ('ព័ត៌មាន / Information', {
            'fields': ('title_km', 'title_en', 'subtitle_km', 'subtitle_en')
        }),
        ('រូបភាព / Image', {
            'fields': ('image',)
        }),
        ('ប៊ូតុង / Button', {
            'fields': ('button_text_km', 'button_text_en', 'link_url')
        }),
        ('ការកំណត់ / Settings', {
            'fields': ('order', 'is_active')
        }),
    )