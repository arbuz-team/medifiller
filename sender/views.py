# -*- coding: utf-8 -*-
from arbuz.views import *
from django.core.mail import EmailMessage
from django.template.loader import render_to_string


class Sender(Manage_Dynamic_Event):

    def Manage_Content(self):
        pass

    def Send_Email(self, title, content, recipient):

        lang = self.request.session['translator_language']
        html = render_to_string(lang + '/sender/content.html', content)
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
