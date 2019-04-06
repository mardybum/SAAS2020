from django.contrib import admin
from django.urls import path, include                 # add this
from rest_framework import routers                    # add this
from zone import views                            # add this


router = routers.DefaultRouter()                      # add this
router.register(r'zone', views.ZoneView, 'zone')     # add this
router.register(r'component', views.ComponentView, 'component')     # add this
router.register(r'threat', views.ThreatView, 'threat')
router.register(r'countermeasure', views.CounterMeasureView, 'countermeasure')
router.register(r'vulnerability', views.VulnerarbilityView, 'vulnerability')
router.register(r'risks', views.RiskView, 'risks')
router.register(r'impact', views.ImpactView, 'impact')
router.register(r'damagelist', views.DamageListView, 'damagelist')
router.register(r'likelihood', views.LikeliHoodView, 'likelihood')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))                # add this
]