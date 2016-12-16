# -*- coding: utf-8 -*-
from arbuz.views import *
from django.core.mail import EmailMessage
from django.template.loader import render_to_string


class Sender(Manage_Dynamic_Event):

    def Manage_Content(self):
        pass

    @staticmethod
    def Send_Email(title, content, recipient):

        html = render_to_string('sender/content.html', content)
        email = EmailMessage\
        (
            title,
            html,
            'sender@arbuz.team',    # nadawca
            [recipient]             # odbiorca
            # headers={'Reply-To': 'reply@arbuz.team'}
        )

        email.content_subtype = "html"
        email.send()

    @staticmethod
    def Launch(request):
        return Sender(request).HTML
