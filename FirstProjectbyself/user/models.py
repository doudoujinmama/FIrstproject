from django.db import models

from django.contrib.auth.models import AbstractUser
from db.BaseClass import BaseModel

class User(AbstractUser, BaseModel):

    class Meta:
        db_table = "auth_user"
        verbose_name = "用户表"
        verbose_name_plural = verbose_name


