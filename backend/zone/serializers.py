from rest_framework import serializers
from .models import *


class ZoneSerializer(serializers.ModelSerializer):

    class Meta:
        model = Zones
        fields = ('id', 'name', 'zoneId', 'description', 'SLT', 'threats')

        #used to make the fields optional
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
        user.save()
        return user
        # newID = Zones.getid(user)
        # user2 = Zones.objects.create(name=validated_data['name'], description=validated_data['description'], zoneId="hi")
        # newId = Zones.getid(user2)
        # user2.save()
        # print("create: ", validated_data)


class ComponentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Component
        #fields = ('id', 'componentName', 'componentDescription', 'zone',)
        fields = '__all__'

        extra_kwargs = {
            'componentName': {
                # Tell DRF that the link field is not required.
                'required': False,
                'allow_blank': True,
            },
            'componentDescription': {
                # Tell DRF that the link field is not required.
                'required': False,
                'allow_blank': True,
            }
        }


class ThreatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Threats
        fields = '__all__'


class CounterMeasureSerializer(serializers.ModelSerializer):

    class Meta:
        model = CounterMeasure
        fields = '__all__'


class VulnerabilitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Vulnerability
        fields = '__all__'


class RiskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Risks
        fields = '__all__'


class ImpactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Impact
        fields = '__all__'


class DamageListSerializer(serializers.ModelSerializer):

    class Meta:
        model = DamageList
        fields = '__all__'


class LikeliHoodSerializer(serializers.ModelSerializer):

    class Meta:
        model = LikeliHood
        fields = '__all__'