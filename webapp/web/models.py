from django.db import models

VIEW = (
    ('queue', 'Queue'),
    ('in_progress', 'In Progress'),
    ('done', 'Done')
)


class Task(models.Model):
    summary = models.CharField(max_length=255)
    description = models.TextField(max_length=2000, null=True, blank=True)
    due_date = models.DateTimeField()
    status = models.CharField(max_length=30, choices=VIEW, default='queue', null=False)
    time_planned = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)

    def __str__(self):
        return self.summary
