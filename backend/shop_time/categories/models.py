from django.db import models
from autoslug import AutoSlugField


class Category(models.Model):
    name = models.CharField(max_length=200,unique=True)  
    slug = AutoSlugField(populate_from='name',unique=True)
    parent = models.ForeignKey('self',related_name='children',on_delete=models.CASCADE,blank=True,null=True)   

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

