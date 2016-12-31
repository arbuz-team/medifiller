from arbuz.views import *


class Statement_403(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['title'] = '403'
        return self.Render_HTML('statement/statement.html')

    @staticmethod
    def Launch(request):
        return Statement_403(request).HTML



class Statement_404(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['title'] = '404'
        return self.Render_HTML('statement/statement.html')

    @staticmethod
    def Launch(request):
        return Statement_404(request).HTML



class Statement_500(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['title'] = '500'
        return self.Render_HTML('statement/statement.html')

    @staticmethod
    def Launch(request):
        return Statement_500(request).HTML
