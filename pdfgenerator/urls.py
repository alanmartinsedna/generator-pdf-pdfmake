from django.urls import path
from .views import tela_relatorio

urlpatterns = [
    path('relatorio/', tela_relatorio, name='pdf_generator'),
]