from django.urls import path
from .views import tela_relatorio

urlpatterns = [
    path('relatorio/', tela_relatorio, name='pdf_generator'),
    path('diagnostico/aderencia-participacao/', tela_relatorio, name='diagnostico_aderencia_participacao'),
    path('diagnostico/respostas/', tela_relatorio, name='diagnostico_respostas'),
    path('diagnostico/recomendacoes/', tela_relatorio, name='diagnostico_recomendacoes'),
    path('avaliacao/aderencia-participacao/', tela_relatorio, name='avaliacao_aderencia_participacao'),
    path('avaliacao/respostas/', tela_relatorio, name='avaliacao_respostas'),
    path('avaliacao/recomendacoes/', tela_relatorio, name='avaliacao_recomendacoes'),
]