from web.models import Task
from rest_framework import viewsets
from api_v1.serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    authentication_classes = []
    queryset = Task.objects.all().order_by('status', 'due_date')
    serializer_class = TaskSerializer
