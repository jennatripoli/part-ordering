from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import BCRUser, Request, Review, Order


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class BCRUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BCRUser
        fields = ['url', 'username', 'email', 'password', 'type']


class RequestSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Request
        fields = ['url', 'id', 'supplier', 'part_number', 'part_url', 'submitter']


class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Review
        fields = ['url', 'id', 'request', 'approved', 'comment', 'reviewer']


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ['url', 'id', 'request', 'tracking_number', 'orderer']