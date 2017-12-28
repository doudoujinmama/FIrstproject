from django.shortcuts import render
from utils.Mivx import LoginRequiredMixin


class register(LoginRequiredMixin):
    def get(self, request):
        if request.method == 'GET':
            return render(request, 'register.html')
        else:
            pass
