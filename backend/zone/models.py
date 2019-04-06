from django.db import models


# Create your models here.


# add this
class Zones(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=500, default=" ")
    zoneId = models.TextField(default=" ")
    description = models.TextField(default=" ")

    def getid(self):
        return self.id

    def setid(self):
        self.zoneId = "ZONE_" + str(self.id)
        return self.id

    def _str_(self):
        return self.name


class Component(models.Model):
    componentName = models.CharField(max_length=300, default=" ")
    componentDescription = models.CharField(max_length=500, default=" ")
    zone = models.ForeignKey(Zones, on_delete=models.CASCADE)


class Threats(models.Model):
    STATUS = (
        ('InWork', 'In Work'),
        ('Approved', 'Approved'),
        ('Released', 'Released'),
        ('Obsolete', 'Obsolete'),
    )

    zone = models.ManyToManyField(Zones, related_name='+')
    threat = models.CharField(max_length=300, default=" ")
    description = models.CharField(max_length=500, default=" ")
    status = models.CharField(max_length=20, choices=STATUS)
    createdBy = models.CharField(max_length=500, default=" ")


class CounterMeasure(models.Model):
    threat = models.ManyToManyField(Threats, related_name='+')
    measure = models.CharField(max_length=300, default=" ")
    description = models.CharField(max_length=300, default=" ")


class Vulnerability(models.Model):
    threat = models.ManyToManyField(Threats, related_name='+')
    name = models.CharField(max_length=300, default=" ")
    description = models.CharField(max_length=300, default=" ")


class Risks(models.Model):
    zone = models.ForeignKey(Zones, on_delete=models.CASCADE)
    tolerableRisk = models.IntegerField(default=" ")
    SLT = models.IntegerField(default=" ")
    actualRisk = models.IntegerField(default=" ")


class Impact(models.Model):
    damagePotential = models.IntegerField(default=" ")
    impactLevel = models.IntegerField(default=" ")
    impactPotential = models.IntegerField(default=" ")
    impactCategory = models.CharField(max_length=300, default=" ")
    risk = models.OneToOneField(Risks, on_delete=models.CASCADE)


class DamageList(models.Model):
    category = models.CharField(max_length=300, default=" ")
    damage = models.CharField(max_length=300, default=" ")
    factor = models.IntegerField(default=" ")
    impact = models.OneToOneField(Impact, on_delete=models.CASCADE)


class LikeliHood(models.Model):
    timeCategory = models.CharField(max_length=300, default=" ")
    experienceCategory = models.CharField(max_length=300, default=" ")
    knowledgeCategory = models.CharField(max_length=300, default=" ")
    equipmentCategory = models.CharField(max_length=300, default=" ")
    opportunityCategory = models.CharField(max_length=300, default=" ")
    timeValue = models.IntegerField(default=" ")
    experienceValue = models.IntegerField(default=" ")
    knowledgeValue = models.IntegerField(default=" ")
    equipmentValue = models.IntegerField(default=" ")
    opportunityValue = models.IntegerField(default=" ")
    impactCategory = models.CharField(max_length=300, default=" ")
    impactLevel = models.IntegerField(default=" ")
    totalImpact = models.IntegerField(default=" ")
    risk = models.OneToOneField(Risks, on_delete=models.CASCADE)

