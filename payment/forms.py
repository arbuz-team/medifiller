from django.forms import models
from payment.models import Payment


class Form_Payment(models.ModelForm):

    class Meta:
        model = Payment
        fields = ()