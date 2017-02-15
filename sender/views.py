# -*- coding: utf-8 -*-
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from arbuz.base import *


class Sender:

    def Attach_Image(self, image_path, image_name):

        img_data = open(BASE_DIR + image_path, 'rb').read()

        img = MIMEImage(img_data, 'png')
        img.add_header('Content-Id', '<{0}>'.format(image_name))
        img.add_header("Content-Disposition", "inline", filename=image_name)

        self.email_html.attach(img)

    def Send_Forgot_Password_Link(self, content, recipient):
        title = 'Change your password.'
        html_file = 'forgot_password.html'
        self.Send_Email(title, content, recipient, html_file)

    def Send_Register_Approved_Link(self, content, recipient):
        title = 'Confirm your new account.'
        html_file = 'register_approved.html'
        self.Send_Email(title, content, recipient, html_file)

    def Send_Payment_Approved(self, content, recipient):
        title = 'Your order is confirmed'
        html_file = 'payment_approved.html'
        self.Send_Email(title, content, recipient, html_file)

    def Send_Email(self, title, content, recipient, html_file):

        html_name = self.language + '/sender/' + html_file
        html = render_to_string(html_name, content)

        body = MIMEText(html, _subtype='html')
        self.email_html.attach(body)

        self.Attach_Image('_static/img/logo.png', 'logo')

        email = EmailMessage(
            subject=title,
            body='',
            from_email='sender@arbuz.team',
            to=[recipient]
            # headers={'Reply-To': 'reply@arbuz.team'}
        )

        email.attach(self.email_html)
        email.send()

    def __init__(self, language):
        self.email_html = MIMEMultipart(_subtype='related')
        self.language = language
