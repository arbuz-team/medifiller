# -*- coding: utf-8 -*-
from arbuz.views import *
from django.core.mail import EmailMessage


class Sender(Manage_Dynamic_Event):

    def Manage_Content(self):
        pass

    @staticmethod
    def Send_Email(title, content, recipient):

        email = EmailMessage\
        (
            title,
            content,
            'sender@arbuz.team',    # nadawca
            [recipient]             # odbiorca
            # headers={'Reply-To': 'reply@arbuz.team'}
        )

        email.send()

    @staticmethod
    def Launch(request):
        return Sender(request).HTML
