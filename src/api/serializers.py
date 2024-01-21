from rest_framework import serializers

from tours.models import Tour


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
