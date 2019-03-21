from django.db import models


class Task(models.Model):
    TURN = 'Очередь'
    IN_WORK = 'В работе'
    MADE = 'Сделано'
    VIEW = (
        (TURN, 'Очередь'),
        (IN_WORK, 'В работе'),
        (MADE, 'Сделано'),
    )
    summary = models.CharField(max_length=255)
    description = models.TextField(max_length=2000, null=True, blank=True)
    due_date = models.DateTimeField()
    status = models.CharField(max_length=30, choices=VIEW, default=TURN, null=False)
    time_planned = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)

    def __str__(self):
        return self.summary

