from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework import serializers

from tours.models import Tour
from users.models import CustomUser


class DynamicFieldModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that controls which fields should be displayed
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop("fields", None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class TourSerializer(DynamicFieldModelSerializer):
    duration_in_weeks = serializers.SerializerMethodField()

    class Meta:
        model = Tour
        fields = "__all__"

    def get_duration_in_weeks(self, obj):
        return obj.get_duration_in_weeks()


class UserRegistrationSerializer(serializers.ModelSerializer):
    """A serializer for registering users"""

    password_confirmation = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "username",
            "email",
            "photo",
            "role",
            "password",
            "password_confirmation",
        ]
        extra_kwargs = {
            "password": {
                "write_only": True
            },  # password is not returned in the response
            "email": {"required": True},  # email is required in the request
        }

    def validate_role(self, value):
        if not value or value not in ["user", "guide"]:
            return "user"
        return value

    def validate(self, data):
        # Validate that the passwords match
        if data["password"] != data["password_confirmation"]:
            raise serializers.ValidationError(
                {"password_confirmation": "Password fields didn't match."}
            )

        # Set the default role to user if not provided
        data["role"] = self.validate_role(data.get("role"))

        return data

    def create(self, validated_data):
        validated_data.pop("password_confirmation", None)
        user = CustomUser.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            photo=validated_data["photo"] if "photo" in validated_data else "",
            role=validated_data["role"],
        )

        try:
            validate_password(validated_data["password"], user=user)
        except ValidationError as e:
            raise serializers.ValidationError({"errors": e.messages})

        return user


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        model = CustomUser
        fields = ["username", "password"]

    def validate(self, data):
        user = authenticate(username=data["username"], password=data["password"])

        if not user:
            raise serializers.ValidationError("Invalid credentials")

        data["user"] = user
        return data
