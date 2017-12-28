# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.contrib.auth.models
import django.utils.timezone
import django.core.validators
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0006_require_contenttypes_0002'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', serialize=False, auto_created=True)),
                ('password', models.CharField(verbose_name='password', max_length=128)),
                ('last_login', models.DateTimeField(null=True, verbose_name='last login', blank=True)),
                ('is_superuser', models.BooleanField(default=False, verbose_name='superuser status', help_text='Designates that this user has all permissions without explicitly assigning them.')),
                ('username', models.CharField(unique=True, help_text='Required. 30 characters or fewer. Letters, digits and @/./+/-/_ only.', error_messages={'unique': 'A user with that username already exists.'}, validators=[django.core.validators.RegexValidator('^[\\w.@+-]+$', 'Enter a valid username. This value may contain only letters, numbers and @/./+/-/_ characters.', 'invalid')], verbose_name='username', max_length=30)),
                ('first_name', models.CharField(verbose_name='first name', max_length=30, blank=True)),
                ('last_name', models.CharField(verbose_name='last name', max_length=30, blank=True)),
                ('email', models.EmailField(verbose_name='email address', max_length=254, blank=True)),
                ('is_staff', models.BooleanField(default=False, verbose_name='staff status', help_text='Designates whether the user can log into this admin site.')),
                ('is_active', models.BooleanField(default=True, verbose_name='active', help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('create_time', models.DateField(auto_now_add=True)),
                ('update_time', models.DateField(auto_now=True)),
                ('is_delete', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(related_name='user_set', help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_query_name='user', blank=True, verbose_name='groups', to='auth.Group')),
                ('user_permissions', models.ManyToManyField(related_name='user_set', help_text='Specific permissions for this user.', related_query_name='user', blank=True, verbose_name='user permissions', to='auth.Permission')),
            ],
            options={
                'db_table': 'auth_user',
                'verbose_name': '用户表',
                'verbose_name_plural': '用户表',
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', serialize=False, auto_created=True)),
                ('title', models.CharField(verbose_name='地区', max_length=40)),
                ('parent', models.ForeignKey(blank=True, null=True, to='user.Address', verbose_name='上级地区id')),
            ],
            options={
                'db_table': 'address',
                'verbose_name': '地址表',
                'verbose_name_plural': '地址表',
            },
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', serialize=False, auto_created=True)),
                ('create_time', models.DateField(auto_now_add=True)),
                ('update_time', models.DateField(auto_now=True)),
                ('is_delete', models.BooleanField(default=False)),
                ('name', models.CharField(verbose_name='收件人', max_length=30)),
                ('addr', models.CharField(verbose_name='地址', max_length=200)),
                ('tel', models.CharField(verbose_name='电话', max_length=11)),
                ('zip', models.CharField(verbose_name='邮编', max_length=30)),
                ('status', models.SmallIntegerField(default=1, verbose_name='是否默认', choices=[(1, '默认'), (0, '不默认')])),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL, verbose_name='用户id')),
            ],
            options={
                'db_table': 'customer',
                'verbose_name': '用户收货地址',
                'verbose_name_plural': '用户收货地址',
            },
        ),
        migrations.CreateModel(
            name='UserDetail',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', serialize=False, auto_created=True)),
                ('create_time', models.DateField(auto_now_add=True)),
                ('update_time', models.DateField(auto_now=True)),
                ('is_delete', models.BooleanField(default=False)),
                ('avatar', models.ImageField(verbose_name='头像', upload_to='avatar')),
                ('birthday', models.DateField(verbose_name='出生年月日')),
                ('gender', models.IntegerField(default=1, verbose_name='性别', choices=[(1, '男'), (2, '女')])),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL, verbose_name='用户id')),
            ],
            options={
                'db_table': 'userdetail',
                'verbose_name': '用户详细信息',
                'verbose_name_plural': '用户详细信息',
            },
        ),
    ]
