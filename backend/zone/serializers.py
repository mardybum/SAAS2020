from rest_framework import serializers
from .models import Zones


class ZoneSerializer(serializers.ModelSerializer):

    class Meta:
        model = Zones
        fields = ('id', 'name', 'zoneId', 'description', 'SLT', 'threats')
        extra_kwargs = {
            'SLT': {
                # Tell DRF that the link field is not required.
                'required': False,
                'allow_blank': True,
            },
            'zoneId': {
                # Tell DRF that the link field is not required.
                'required': False,
                'allow_blank': True,
            },
            'threats': {
                # Tell DRF that the link field is not required.
                'required': False,
                'allow_blank': True,
            }
        }

    def create(self, validated_data):
        #print("create: ", validated_data)
        user = Zones.objects.create(**validated_data)
        print(Zones.setid(user))
        return user
        # newID = Zones.getid(user)
        # user2 = Zones.objects.create(name=validated_data['name'], description=validated_data['description'], zoneId="hi")
        # newId = Zones.getid(user2)
        # user2.save()
        # print("create: ", validated_data)