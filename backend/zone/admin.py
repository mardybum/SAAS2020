from django.contrib import admin
from .models import Zones # add this

class ZonesAdmin(admin.ModelAdmin):  # add this
  list_display = ('name', 'description', 'SLT', 'threats') # add this

# Register your models here.
admin.site.register(Zones, ZonesAdmin) # add this
