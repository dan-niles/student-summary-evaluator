from django.db import models

# Create your models here.

class Text(models.Model):
    title = models.CharField(max_length=20)
    question = models.CharField(max_length=100)
    text = models.TextField()
    # dob = models.DateField()
    
    def __str__(self):
        return self.title
    
class Summaries(models.Model):
    text = models.ForeignKey(Text, on_delete=models.CASCADE)
    summary = models.TextField()
    

    def __int__(self):
        return self.pk

class Teachers(models.Model):
    firstName = models.CharField(max_length=20)
    lastName = models.CharField(max_length=20)

    def __int__(self):
        return self.pk
    
class Students(models.Model):
    firstName = models.CharField(max_length=20)
    lastName = models.CharField(max_length=20)

    def __int__(self):
        return self.pk
    
