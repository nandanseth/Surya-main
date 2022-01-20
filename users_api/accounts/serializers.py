from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def get_authenticated_user(self):
        email = self.data.get("email")
        password = self.data.get("password")
        user = authenticate(username=email, password=password)
        return user

    class Meta:
        model = User
        fields = ("email")
