# -*- coding: utf-8 -*-
from .forms import *
from arbuz.views import *
from django.core.mail import EmailMessage



class Send_Email(Manage_Dynamic_Event):

    def Manage_Content(self):
        pass

    @staticmethod
    def Send(title, content):

        email = EmailMessage\
        (
            title,
            content,
            'sender@arbuz.team',        # nadawca
            ['recipient@arbuz.team']    # odbiorca
            # headers={'Reply-To': 'reply@arbuz.team'}
        )

        email.send()

    @staticmethod
    def Launch(request):
        return Send_Email(request).HTML
