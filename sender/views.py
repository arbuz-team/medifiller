# -*- coding: utf-8 -*-
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class Sender:

    def Attach_Image(self, image_path, image_name):

        img_data = open(image_path, 'rb').read()

        img = MIMEImage(img_data, 'png')
        img.add_header('Content-Id', '<{0}>'.format(image_name))
        img.add_header("Content-Disposition", "inline", filename=image_name)

        self.email_html.attach(img)

    def Send_Forgot_Password_Link(self, title, content, recipient):

        html_name = self.language + '/sender/forgot_password.html'
        html = render_to_string(html_name, content)

        body = MIMEText(html, _subtype='html')
        self.email_html.attach(body)

        self.Send_Email(title, recipient)

    def Send_Register_Approved_Link(self, title, content, recipient):

        html_name = self.language + '/sender/register_approved.html'
        html = render_to_string(html_name, content)

        body = MIMEText(html, _subtype='html')
        self.email_html.attach(body)

        self.Send_Email(title, recipient)

    def Send_Email(self, title, recipient):
        self.Attach_Image('_static/pluginy/arbuz/img/logo.png', 'logo')

        email = EmailMessage \
                (
                subject=title,
                body='',
                from_email='sender@arbuz.team',
                to=[recipient]
                # headers={'Reply-To': 'reply@arbuz.team'}
            )

        email.attach(self.email_html)
        email.send()

    def __init__(self, request):
        self.request = request
        self.email_html = MIMEMultipart(_subtype='related')
        self.language = self.request.session['translator_language']
