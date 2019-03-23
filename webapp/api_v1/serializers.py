from web.models import Task
from rest_framework import serializers


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ('id', 'summary', 'description', 'due_date', 'status', 'time_planned')
