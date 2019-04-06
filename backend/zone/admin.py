from django.contrib import admin
from .models import *

admin.site.register(Zones)
admin.site.register(Component)
admin.site.register(Threats)
admin.site.register(CounterMeasure)
admin.site.register(Vulnerability)
admin.site.register(Risks)
admin.site.register(Impact)
admin.site.register(DamageList)
admin.site.register(LikeliHood)