from arbuz.views import *


class Statement(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['message'] = 'Website manage statement.'
        return self.Render_HTML('statement/statement.html')

    @staticmethod
    def Launch(request):
        return Statement(request).HTML



class Statement_404(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['title'] = '404 not found'
        self.content['message'] = '404: not found.'
        return self.Render_HTML('statement/statement.html')

    @staticmethod
    def Launch(request):
        return Statement_404(request).HTML



class Statement_Register(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['title'] = 'Register'
        self.content['message'] = 'User is correct registred.'
        return self.Render_HTML('statement/statement.html')

    @staticmethod
    def Launch(request):
        return Statement_Register(request).HTML



class Statement_Login(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['title'] = 'Login'
        self.content['message'] = 'User is correct logged.'
        return self.Render_HTML('statement/statement.html')

    @staticmethod
    def Launch(request):
        return Statement_Login(request).HTML
