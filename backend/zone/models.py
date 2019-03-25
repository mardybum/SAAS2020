from django.db import models


# Create your models here.


# add this
class Zones(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=300, default=" ")
    zoneId = models.TextField(default=" ")
    description = models.TextField(default=" ")
    SLT = models.TextField(default=" ")
    threats = models.TextField(default=" ")

    def getid(self):
        return self.id

    def setid(self):
        self.zoneId = "ZONE_" + str(self.id)
        return self.id

    def _str_(self):
        return self.name
