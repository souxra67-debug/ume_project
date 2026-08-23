from django.db import models


class HeroBanner(models.Model):
    title_km = models.CharField('ចំណងជើង (ខ្មែរ)', max_length=200, blank=True, default='')
    title_en = models.CharField('Title (English)', max_length=200, blank=True, default='')
    
    subtitle_km = models.CharField('អត្ថបទរង (ខ្មែរ)', max_length=300, blank=True, default='')
    subtitle_en = models.CharField('Subtitle (English)', max_length=300, blank=True, default='')
    
    # ✅ រូបភាពផ្ទាល់ (upload ពី admin)
    image = models.ImageField('រូបភាព', upload_to='banners/')
    
    button_text_km = models.CharField('អក្សរលើប៊ូតុង (ខ្មែរ)', max_length=60, blank=True, default='')
    button_text_en = models.CharField('Button text (English)', max_length=60, blank=True, default='')
    link_url = models.CharField('តំណភ្ជាប់', max_length=255, blank=True, default='')
    
    order = models.PositiveIntegerField('លំដាប់', default=0)
    is_active = models.BooleanField('បង្ហាញ', default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Hero Banner'
        verbose_name_plural = 'Hero Banners'

    def __str__(self):
        return self.title_en or self.title_km or f'Banner #{self.id}'