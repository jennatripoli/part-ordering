from django.shortcuts import render

from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
from .models import BCRUser, Request, Review, Order

from api.quickstart.serializers import GroupSerializer, UserSerializer, BCRUserSerializer, RequestSerializer, ReviewSerializer, OrderSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse

import json


@api_view(['POST'])
def validate_login(input):
    data = json.loads(input.body)
    username = data['username']
    password = data['password']

    try:
        BCRUser.objects.get(username=username, password=password)
    
    except BCRUser.DoesNotExist:
        return HttpResponse(status=401)
    
    return Response({'message': username})


@api_view(['POST'])
def submit_request(input):
    data = json.loads(input.body)
    supplier = data['supplier']
    part_number = data['part_number']
    part_url = data['part_url']
    submitter = data['submitter']

    try:
        BCRUser.objects.get(username=submitter)
    
    except BCRUser.DoesNotExist:
        request = Request.objects.create(
            supplier = supplier,
            part_number = part_number,
            part_url = part_url,
        )
        request.save()
        return Response({'message': 'Submitted request on behalf of an unknown user.'})
    
    else:
        request = Request.objects.create(
            supplier = supplier,
            part_number = part_number,
            part_url = part_url,
            submitter = submitter,
        )
        request.save()
        return Response({'message': 'Submitted request on behalf of %s.' % submitter})


@api_view(['POST'])
def get_request(input):
    data = json.loads(input.body)
    id = data['id']

    try:
        request = Request.objects.get(id=id)

    except Request.DoesNotExist:
        return HttpResponse(status=400)
    
    else:
        temp_request = {
            "id": request.id,
            "supplier": request.supplier,
            "part_number": request.part_number,
            "part_url": request.part_url,
            "submitter": request.submitter,
        }
    
    return Response({'message': temp_request})


@api_view(['POST'])
def update_request(input):
    data = json.loads(input.body)
    id = data['id']
    supplier = data['supplier']
    part_number = data['part_number']
    part_url = data['part_url']

    try:
        request = Request.objects.get(id=id)
    
    except Request.DoesNotExist:
        return HttpResponse(status=400)
    
    else:
        request.supplier = supplier
        request.part_number = part_number
        request.part_url = part_url
        request.save()
        return Response({'message': 'Saved changes.'})


@api_view(['DELETE'])
def delete_request(input):
    data = json.loads(input.body)
    id = data['id']

    Request.objects.filter(id=id).delete()
    return Response({'message': 'Deleted request with the id %s.' % id})


@api_view(['GET'])
def get_requests(input):
    temp_requests = []
    requests = Request.objects.all()

    for request in requests:
        temp_request = {
            "id": request.id,
            "supplier": request.supplier,
            "part_number": request.part_number,
            "part_url": request.part_url,
            "submitter": request.submitter,
        }
        temp_requests.append(temp_request)

    return Response({'message': temp_requests})


@api_view(['GET'])
def get_suppliers(input):
    suppliers = []
    for supplier in Request.APPROVED_SUPPLIERS:
        suppliers.append(supplier)

    return Response({'message': suppliers})


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class BCRUserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows BCRUsers to be viewed or edited.
    """
    queryset = BCRUser.objects.all().order_by('username')
    serializer_class = BCRUserSerializer
    permission_classes = [permissions.IsAuthenticated]


class RequestViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Requests to be viewed or edited.
    """
    queryset = Request.objects.all().order_by('id')
    serializer_class = RequestSerializer
    permission_classes = [permissions.IsAuthenticated]


class ReviewViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Reviews to be viewed or edited.
    """
    queryset = Review.objects.all().order_by('id')
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]


class OrderViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Orders to be viewed or edited.
    """
    queryset = Order.objects.all().order_by('id')
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]