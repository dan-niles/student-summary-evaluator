from django.db import models

# Create your models here.
class Teachers(models.Model):
    firstName = models.CharField(max_length=20)
    lastName = models.CharField(max_length=20)

    def __int__(self):
        return self.firstName
    
class Students(models.Model):
    firstName = models.CharField(max_length=20)
    lastName = models.CharField(max_length=20)
    
    def __int__(self):
        return self.firstName
        
class Text(models.Model):
    title = models.CharField(max_length=20)
    # question = models.CharField(max_length=100)
    text = models.TextField()
    
    def __str__(self):
        return self.title
    
class Assignments(models.Model):
    question = models.CharField(max_length=50)
    textTitle = models.ForeignKey(Text, on_delete=models.CASCADE)
    deadline = models.DateField(null=True)
    createdBy = models.ForeignKey(Teachers, on_delete=models.CASCADE)

    def __int__(self):
        return self.question 
    
class Summaries(models.Model):
    # text = models.ForeignKey(Text, on_delete=models.CASCADE)
    question = models.ForeignKey(Assignments, on_delete=models.CASCADE)
    student = models.ForeignKey(Students, on_delete=models.CASCADE)
    summary = models.TextField()
    content_score = models.DecimalField(max_digits=5,decimal_places=2,default=0.00)
    wording_score = models.DecimalField(max_digits=5,decimal_places=2,default=0.00)
    submitted_on = models.DateField(null=True)

    # def __int__(self):
    #     return self.

# class Score(models.Model):
#     student = models.ForeignKey(Students, on_delete=models.CASCADE)
#     question = models.ForeignKey(Assignments, on_delete=models.CASCADE)
#     content_score = models.DecimalField(max_digits=5,decimal_places=2,default=0.00)
#     wording_score = models.DecimalField(max_digits=5,decimal_places=2,default=0.00)

    def __int__(self):
        return self.pk 
    

    

