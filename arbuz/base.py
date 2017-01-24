from django.shortcuts import render
from django.http import JsonResponse
from arbuz.settings import MEDIA_ROOT, MEDIA_URL
import base64, imghdr, os, random


class Dynamic_Base:

    def Render_HTML(self, file_name, form_name = ''):

        # example: EN/user/sign_in.html
        template = self.request.session['translator_language'] \
                   + '/' + file_name

        self.content['form_name'] = form_name
        return render(self.request, template, self.content)

    @staticmethod
    def Save_Image_From_Base64(image):

        base64_image = image.split(',', 1)[1]
        base64_data = image.split(';', 1)[0]
        base64_format = base64_data.split('/')[1]

        image_name = '{0}.{1}'.format(random.randrange(1000, 9999), base64_format)
        image_path_root = '{0}/{1}'.format(MEDIA_ROOT, image_name)
        image_path_url = '{0}{1}'.format(MEDIA_URL, image_name)

        # file with the name exists
        if os.path.exists(image_path_root):
            Dynamic_Base.Save_Image_From_Base64(image)

        with open(image_path_root, "wb") as file:
            file.write(base64.b64decode(base64_image))

        # if file is not image
        if imghdr.what(image_path_root) not in ['jpeg', 'png']:
            os.remove(image_path_root)
            image_path_url = ''

        return image_path_url

    def __init__(self, request):
        self.request = request
        self.content = {}
        self.app_name = self.__module__.split('.')[0]
