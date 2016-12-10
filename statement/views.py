from arbuz.views import *


class Statement_404(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['title'] = '404 not found'
        self.content['message'] = '404: not found.'
        return self.Render_HTML('statement/statement.html')

    @staticmethod
    def Launch(request):
        return Statement_404(request).HTML



class Statement_500(Manage_Dynamic_Event):

    def Manage_Content(self):
        self.content['title'] = '500 internal server error'
        self.content['message'] = '500: internal server error.'
        return self.Render_HTML('statement/statement.html')

    @staticmethod
    def Launch(request):
        return Statement_500(request).HTML
