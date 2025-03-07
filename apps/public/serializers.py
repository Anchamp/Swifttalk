from django.contrib.auth.models import User 
from django.contrib.auth import authenticate
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(help_text=False)
    class Meta:
        model = User 
        fields = ('username','password','first_name','last_name','email')
        write_only_fields = ['password','email']

        extra_kwargs = {k: {'write_only':True} for k in write_only_fields}
    
    def validate_username(self, attrs):
        if User.objects.filter(username=attrs).first():
            raise serializers.ValidationError("username already registered")
        return attrs 

    def create(self, validated_data: dict ):
        user = User.objects.create_user(**validated_data)
        return user
    
    def save(self, **kwargs):
        return super().save(**kwargs)
    
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type':'password'})

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        user = authenticate(username=username, password=password)
        if user:
            return user 
        raise serializers.ValidationError("wrong username/password!")
