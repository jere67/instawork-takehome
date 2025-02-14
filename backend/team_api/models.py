from django.db import models

class TeamMember(models.Model):
  roleChoices = [
      ('regular', 'Regular'),
      ('admin', 'Admin'),
  ]
  
  first_name = models.CharField(max_length=100)
  last_name = models.CharField(max_length=100)
  email = models.EmailField(unique=True)
  phone = models.CharField(max_length=20)
  role = models.CharField(max_length=10, choices=roleChoices, default='regular')
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
      return f"{self.first_name} {self.last_name}"

class Meta:
  ordering = ['first_name', 'last_name']