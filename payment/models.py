from decimal import Decimal

from payments import PurchasedItem
from payments.models import BasePayment

class Payment(BasePayment):

    failure_url = ''
    success_url = ''

    def get_failure_url(self):
        return self.failure_url

    def get_success_url(self):
        return self.success_url

    def get_purchased_items(self):
        # you'll probably want to retrieve these from an associated order
        yield PurchasedItem(name='The Hound of the Baskervilles', sku='BSKV',
                            quantity=9, price=Decimal(10), currency='USD')
