from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from .models import User


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    fieldsets = DjangoUserAdmin.fieldsets + (
        (
            "Admin panel profile",
            {
                "fields": (
                    "role",
                    "phone",
                    "avatar",
                    "is_active_admin",
                    "last_login_ip",
                )
            },
        ),
    )
    list_display = ("username", "email", "role", "is_staff", "is_active_admin", "created_at")
    list_filter = DjangoUserAdmin.list_filter + ("role", "is_active_admin")