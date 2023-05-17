# Django
from django.contrib import admin

# Alliance Auth
from allianceauth.services.admin import ServicesUserAdmin

from .models import Phpbb3User


@admin.register(Phpbb3User)
class Phpbb3UserAdmin(ServicesUserAdmin):
    list_display = ServicesUserAdmin.list_display + ("username",)
    search_fields = ServicesUserAdmin.search_fields + ("username",)
