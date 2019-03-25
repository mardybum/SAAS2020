from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import ZoneSerializer      # add this
from .models import Zones                     # add this


class ZoneView(viewsets.ModelViewSet):       # add this
    serializer_class = ZoneSerializer
    queryset = Zones.objects.all()

    #def perform_create(self, serializer):
        # The request user is set as author automatically.
        #print("create: ", serializer.validated_data)
        #print("create: ", self.request.data)
        #serializer.save(zoneId=serializer.validated_data['name'])
