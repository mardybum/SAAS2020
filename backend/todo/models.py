from django.db import models
    # Create your models here.


# add this
class Todo(models.Model):
  title = models.CharField(max_length=120, default=" ")
  description = models.TextField(default=" ")
  completed = models.BooleanField(default=False)

  def _str_(self):
    return self.title