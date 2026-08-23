from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = 'Seed demo admin user for development'

    def handle(self, *args, **options):
        # Check if admin user already exists
        admin_user = User.objects.filter(username='admin').first()

        if admin_user:
            self.stdout.write(
                self.style.WARNING('Admin user already exists!')
            )
            return

        # Create demo admin user
        User.objects.create_superuser(
            username='superadmin',
            email='admin@gmail.com',
            password='superadmin@123',
            role=User.Role.ADMIN,
            phone='+1234567890'
        )

        self.stdout.write(
            self.style.SUCCESS('Successfully created demo admin user')
        )
        self.stdout.write(
            self.style.SUCCESS('Username: admin')
        )
        self.stdout.write(
            self.style.SUCCESS('Password: admin@123')
        )
