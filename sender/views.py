# -*- coding: utf-8 -*-
from django.core.mail import EmailMessage
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from translator.views import *
from invoice.views import *


class Sender(Dynamic_Base):

    def Attach_Image(self, image_path, image_name):

        img_data = open(BASE_DIR + image_path, 'rb').read()

        img = MIMEImage(img_data, 'png')
        img.add_header('Content-Id', '<{0}>'.format(image_name))
        img.add_header("Content-Disposition", "inline", filename=image_name)

        self.email_html.attach(img)

    def Send_Forgot_Password_Link(self, content, recipient):
        title = Text(self.request, 32)
        html_file = 'forgot_password.html'
        recipient = [recipient]
        self.Send_Email(title, content, recipient, html_file)

    def Send_Register_Approved_Link(self, content, recipient):
        title = Text(self.request, 33)
        html_file = 'register_approved.html'
        recipient = [recipient]
        self.Send_Email(title, content, recipient, html_file)

    def Send_Payment_Approved(self, content, recipient, pdf):
        title = Text(self.request, 34)
        html_file = 'payment_approved.html'
        recipient = [recipient, ROOT_EMAIL]
        self.Send_Email(title, content, recipient, html_file, pdf)

    def Send_Contact_Question(self, title, content, recipient):
        html_file = 'contact_question.html'
        reply_to = recipient
        recipient = [recipient, ROOT_EMAIL]
        self.Send_Email(title, content, recipient, html_file, reply_to)

    def Send_Email(self, title, content, recipient,
                   html_file, reply_to=None, pdf=None):

        self.content = content

        html = self.Render_HTML('sender/' + html_file)
        body = MIMEText(html.content.decode(), _subtype='html')
        self.email_html.attach(body)

        self.Attach_Image('/_static/img/logo.png', 'logo')

        email = EmailMessage(
            subject=title,
            body='',
            from_email='Spa Sungate <sender@arbuz.team>',
            to=recipient,
            reply_to=reply_to
        )

        if pdf:
            email.attach()

        email.attach(self.email_html)
        email.send()

    def __init__(self, request):
        Dynamic_Base.__init__(self, request)
        self.email_html = MIMEMultipart(_subtype='related')
