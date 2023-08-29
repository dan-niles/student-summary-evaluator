from rest_framework import serializers
from .models import Text, Summaries


class TextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        fields = '__all__'

class SummariesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Summaries
        fields = '__all__'