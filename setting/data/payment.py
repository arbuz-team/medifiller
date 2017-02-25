from payment.base import *
from user.models import *
from product.models import *

def Load_Default_Data():

    user = User.objects.get(email='dominik.betka@gmail.com')
    payment = Payment(
        user=user,
        date=date.today(),
        total_price=300,
        currency='PLN',
        service='Dotpay',
        language='PL',
        approved=True
    )

    payment.save()
    address = User_Address.objects.filter(user=user)[0]
    Payment_Address(
        payment=payment,
        full_name=address.full_name,
        doctor_number=address.doctor_number,
        address_line_1=address.address_line_1,
        address_line_2=address.address_line_2,
        city=address.city,
        region=address.region,
        postcode=address.postcode,
        country=address.country
    ).save()

    Selected_Product(
        payment=payment,
        product=Product.objects.all()[0],
        number=3
    ).save()

    Selected_Product(
        payment=payment,
        product=Product.objects.all()[1],
        number=3
    ).save()



    payment = Payment(
        user=user,
        date=date.today(),
        total_price=150,
        currency='EUR',
        service='PayPal',
        language='EN',
        approved=True
    )

    payment.save()
    address = User_Address.objects.filter(user=user)[0]
    Payment_Address(
        payment=payment,
        full_name=address.full_name,
        doctor_number=address.doctor_number,
        address_line_1=address.address_line_1,
        address_line_2=address.address_line_2,
        city=address.city,
        region=address.region,
        postcode=address.postcode,
        country=address.country
    ).save()

    Selected_Product(
        payment=payment,
        product=Product.objects.all()[2],
        number=20
    ).save()

