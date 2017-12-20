from django.db import models

from django.contrib.auth.models import AbstractUser
from db.BaseClass import BaseModel

class User(AbstractUser, BaseModel):

    class Meta:
        db_table = "auth_user"
        verbose_name = "用户表"
        verbose_name_plural = verbose_name


class Address(models.Model):
    title = models.CharField(max_length=40, verbose_name="地区")
    parent = models.ForeignKey("self", null=True, blank=True,verbose_name="上级地区id")
    class Meta:
        db_table = "address"
        verbose_name = "地址表"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title



class Customer(BaseModel):
    STATUS_CHOICE = ((1, '默认'), (0, '不默认'))
    user = models.ForeignKey('User', verbose_name='用户id')
    name = models.CharField(max_length=30, verbose_name='收件人')
    addr = models.CharField(max_length=200, verbose_name='地址')
    tel = models.CharField(max_length=11, verbose_name='电话')
    zip = models.CharField(max_length=30, verbose_name='邮编')
    status = models.SmallIntegerField(choices=STATUS_CHOICE, default=1, verbose_name='是否默认')
    class Meta:
        db_table = 'customer'
        verbose_name = '用户收货地址'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name
