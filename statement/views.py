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
        self.content['message'] = '404: not found.'
        return self.Render_HTML('statement/statement.html')

    @staticmethod
    def Launch(request):
        return Statement_404(request).HTML



class Statement_Register(Manage_Dynamic_Event):

    def Manage_Content(self):
        return self.Render_HTML('statement/statement.html')

    @staticmethod
    def Launch(request):
        pass

    @staticmethod
    def Launch_OK(request):
        statement = Statement_Register(request, autostart=False)
        statement.content['message'] = 'User is correct registred.'
        return statement.Manage()

    @staticmethod
    def Launch_NOK(request):
        statement = Statement_Register(request, autostart=False)
        statement.content['message'] = 'An error occurred while register.'
        return statement.Manage()



class Statement_Login(Manage_Dynamic_Event):

    def Manage_Content(self):
        return self.Render_HTML('statement/statement.html')

    @staticmethod
    def Launch(request):
        pass

    @staticmethod
    def Launch_OK(request):
        statement = Statement_Login(request, autostart=False)
        statement.content['message'] = 'User is correct logged.'
        return statement.Manage()

    @staticmethod
    def Launch_NOK(request):
        statement = Statement_Login(request, autostart=False)
        statement.content['message'] = 'An error occurred while login.'
        return statement.Manage()
