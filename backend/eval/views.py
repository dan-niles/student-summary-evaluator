from django.shortcuts import render
from django.http import JsonResponse
from .models import Text, Summaries
from rest_framework import viewsets
# from rest_framework.response import Response
# from rest_framework.decorators import api_view
from .serializers import TextSerializer, SummariesSerializer
# Build paths inside the project like this: BASE_DIR / 'subdir'.

# Create your views here.

class TextView(viewsets.ModelViewSet):
    queryset = Text.objects.all()
    serializer_class = TextSerializer

class SummariesView(viewsets.ModelViewSet):
    queryset = Summaries.objects.all()
    serializer_class = SummariesSerializer

# def home_view(request):
#     context = {}
#     texts = Text.objects.all()
#     return render(request, 'index.html')

# @api_view(['GET'])
# def showText(request, pk):

#     texts = Text.objects.all()
#     serilizer = TextSerializer(texts, many=)
#     return Response(serilizer.data)

# @api_view(['POST'])
# def addSummary(request):
#     serilizer = SummariesSerializer(data=request.data)

#     if serilizer.is_valid():
#         serilizer.save()

#     return Response(serilizer.data)
