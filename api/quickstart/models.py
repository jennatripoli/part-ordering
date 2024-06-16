import uuid
from django.db import models

class BCRUser(models.Model):
    STUDENT = "Student"
    MENTOR = "Mentor"
    OPERATIONS = "Operations"

    USER_TYPE = {
        STUDENT: "Student",
        MENTOR: "Mentor",
        OPERATIONS: "Operations",
    }

    username = models.TextField(primary_key=True)
    email = models.EmailField()
    password = models.TextField()
    type = models.TextField(choices=USER_TYPE, default=STUDENT)


class Request(models.Model):
    TESTSUPPLIER1 = "Test Supplier 1"
    TESTSUPPLIER2 = "Test Supplier 2"
    TESTSUPPLIER3 = "Test Supplier 3"

    APPROVED_SUPPLIERS = {
        TESTSUPPLIER1: "Test Supplier 1",
        TESTSUPPLIER2: "Test Supplier 2",
        TESTSUPPLIER3: "Test Supplier 3",
    }

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    supplier = models.TextField(choices=APPROVED_SUPPLIERS)
    part_number = models.TextField()
    part_url = models.URLField()
    submitter = models.TextField()


class Review(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    request = models.ForeignKey(Request, null=True, on_delete=models.SET_NULL)
    approved = models.BooleanField()
    comment = models.TextField()
    reviewer = models.ForeignKey(BCRUser, null=True, on_delete=models.SET_NULL)


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    request = models.ForeignKey(Request, null=True, on_delete=models.SET_NULL)
    tracking_number = models.TextField()
    orderer = models.ForeignKey(BCRUser, null=True, on_delete=models.SET_NULL)
