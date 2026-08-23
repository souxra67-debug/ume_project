from rest_framework import serializers
from .models import NewsCategory, News, Event


class NewsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsCategory
        fields = ['id', 'name_km', 'name_en', 'slug']
        read_only_fields = ['slug']


class NewsSerializer(serializers.ModelSerializer):
    category = NewsCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=NewsCategory.objects.all(),
        source='category',
        write_only=True,
        required=False,
        allow_null=True
    )

    class Meta:
        model = News
        fields = [
            'id', 'title_km', 'title_en', 'slug',
            'excerpt_km', 'excerpt_en',
            'content_km', 'content_en',
            'thumbnail', 'category', 'category_id',
            'is_featured', 'is_published',
            'published_at', 'updated_at', 'views',
        ]
        read_only_fields = ['slug', 'published_at', 'updated_at', 'views']


# ✅ បន្ថែម Event Serializer
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ['slug', 'created_at', 'updated_at']