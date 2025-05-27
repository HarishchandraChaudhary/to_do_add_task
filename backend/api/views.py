from django.shortcuts import render
from rest_framework import viewsets,permissions
from .serializers import *
from .models import *
from rest_framework.response import Response
from .serializers import CountrySerializer
from .models import FootballClub
from rest_framework.response import Response
# Create your views here.

from rest_framework import permissions

class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    permission_classes = [permissions.AllowAny] 


    def list(self,request):
        queryset = Country.objects.all()
        serializer = self.serializer_class(queryset,many=True)
        return Response(serializer.data)
    

class LeagueViewSet(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer
    permission_classes = [permissions.AllowAny] 


    def list(self,request):
        queryset = League.objects.all()
        serializer = self.serializer_class(queryset,many=True)
        return Response(serializer.data)
    

class CharasteristicsViewSet(viewsets.ModelViewSet):
    queryset = Charasteristics.objects.all()
    serializer_class = CharasteristicsSerializer
    permission_classes = [permissions.AllowAny] 


    def list(self,request):
        queryset = Charasteristics.objects.all()
        serializer = self.serializer_class(queryset,many=True)
        return Response(serializer.data)
    

class FootballClubViewSet(viewsets.ModelViewSet):
    queryset = FootballClub.objects.all()
    serializer_class = FootballClubSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    permission_classes = [permissions.AllowAny]
    queryset = FootballClub.objects.all()
    serializer_classes = FootballClubSerializer

    def list(self,request):
        queryset = FootballClub.objects.all()
        serializer = self.serializer_class(queryset,many=True)
        return Response(serializer.data)

    def create(self,request):
        serializer = self.serializer_classes(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=400)
    def retriver(self,request,pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)
    
    def update(self,request,pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=400)

    def destroy(self,request,pk=None):
        queryset = self.queryset.get(pk=pk)
        queryset.delete()
        return Response(staus=204)




