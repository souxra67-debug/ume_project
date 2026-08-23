from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom user model for UME Admin.
    Extends Django's AbstractUser (keeps username/password/email/is_staff/
    is_superuser etc.) and adds fields useful for an admin CMS.
    """

    class Role(models.TextChoices):
        SUPERADMIN = "superadmin", "Super Admin"
        ADMIN = "admin", "Admin"
        EDITOR = "editor", "Editor"

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.EDITOR,
        help_text="Controls what this account can do inside the admin panel.",
    )
    phone = models.CharField(max_length=20, blank=True)
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
    last_login_ip = models.GenericIPAddressField(blank=True, null=True)
    is_active_admin = models.BooleanField(
        default=True,
        help_text="Separate 'soft disable' switch for admin access, distinct from is_active.",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "accounts_user"
        ordering = ["-created_at"]

    def __str__(self):
        return self.username

    @property
    def is_admin_role(self):
        return self.role in (self.Role.SUPERADMIN, self.Role.ADMIN)