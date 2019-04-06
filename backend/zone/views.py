from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import *
from .models import *


class ZoneView(viewsets.ModelViewSet):       # add this
    serializer_class = ZoneSerializer
    queryset = Zones.objects.all()


class ComponentView(viewsets.ModelViewSet):  # add this
    serializer_class = ComponentSerializer
    queryset = Component.objects.all()


class ThreatView(viewsets.ModelViewSet):  # add this
    serializer_class = ComponentSerializer
    queryset = Threats.objects.all()


class CounterMeasureView(viewsets.ModelViewSet):  # add this
        serializer_class = CounterMeasureSerializer
        queryset = CounterMeasure.objects.all()


class VulnerarbilityView(viewsets.ModelViewSet):  # add this
    serializer_class = VulnerabilitySerializer
    queryset = Vulnerability.objects.all()


class RiskView(viewsets.ModelViewSet):  # add this
    serializer_class = RiskSerializer
    queryset = Risks.objects.all()


class ImpactView(viewsets.ModelViewSet):  # add this
    serializer_class = ImpactSerializer
    queryset = Impact.objects.all()


class DamageListView(viewsets.ModelViewSet):  # add this
    serializer_class = DamageListSerializer
    queryset = DamageList.objects.all()


class LikeliHoodView(viewsets.ModelViewSet):  # add this
    serializer_class = LikeliHoodSerializer
    queryset = LikeliHood.objects.all()




    #def perform_create(self, serializer):
        # The request user is set as author automatically.
        #print("create: ", serializer.validated_data)
        #print("create: ", self.request.data)
        #serializer.save(zoneId=serializer.validated_data['name'])
