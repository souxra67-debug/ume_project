from rest_framework import serializers
from .models import HeroBanner


class HeroBannerSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)
    
    class Meta:
        model = HeroBanner
        fields = [
            'id', 'title_km', 'title_en',
            'subtitle_km', 'subtitle_en',
            'image', 'button_text_km', 'button_text_en',
            'link_url', 'order', 'is_active',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def validate_image(self, value):
        """Validate image file size and type"""
        if value and hasattr(value, 'size'):
            # កំណត់ទំហំអតិបរមា 5MB
            max_size = 5 * 1024 * 1024
            if value.size > max_size:
                raise serializers.ValidationError('រូបភាពមិនត្រូវធំជាង 5MB ទេ')
            
            # ពិនិត្យប្រភេទឯកសារ
            allowed_types = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
            if hasattr(value, 'content_type') and value.content_type not in allowed_types:
                raise serializers.ValidationError('សូមប្រើតែ JPEG, PNG, ឬ WebP')
        
        return value