from django.shortcuts import render

# Create your views here.

def tela_relatorio(request):
    return render(request, 'index.html')
