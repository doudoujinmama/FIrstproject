from django.db import models

class BaseModel(models.Model):
    create_time = models.DateField(auto_now_add=True)
    update_time = models.DateField(auto_now=True)
    is_delete = models.BooleanField(default=False)
    class Meta:
        abstract=True  # 标示是个抽象模型类  不会创建表
