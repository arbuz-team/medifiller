from inspect import getmembers, ismethod



class Session_Controller:

    def Check_Session_User(self):

        if 'user_login' not in self.request.session:
            self.request.session['user_login'] = False

        if 'user_id' not in self.request.session:
            self.request.session['user_id'] = 0

        if 'user_name' not in self.request.session:
            self.request.session['user_name'] = ''

    def Check_Session_Root(self):

        if 'root_login' not in self.request.session:
            self.request.session['root_login'] = False

    def Check_Session(self):

        methods = getmembers(self, predicate=ismethod)
        methods = [metoda[0] for metoda in methods]

        for method in methods:
            if 'Check_Session_' in method:
                getattr(Session_Controller, method)(self)


    def __init__(self, request):
        self.request = request
        self.Check_Session()



def Check_Session(request):
    Session_Controller(request)