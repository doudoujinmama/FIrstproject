from django.conf.urls import include, url
from user.views import register


urlpatterns = [
    url('^register/$',register.as_view(), name='register')

]