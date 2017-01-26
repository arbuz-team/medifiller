from django.shortcuts import render
from django.http import JsonResponse
from arbuz.settings import MEDIA_ROOT, MEDIA_URL
import base64, imghdr, os, random
from PIL import Image
from io import BytesIO
from urllib.request import urlopen


class Dynamic_Base:

    def Render_HTML(self, file_name, form_name = ''):

        # example: EN/user/sign_in.html
        template = self.request.session['translator_language'] \
                   + '/' + file_name

        self.content['form_name'] = form_name
        return render(self.request, template, self.content)

    @staticmethod
    def Generate_Image_Details(image_format):

        name = '{0}.{1}'.format(random.randrange(1000, 9999), image_format)
        path_root = '{0}/{1}'.format(MEDIA_ROOT, name)
        path_url = '{0}{1}'.format(MEDIA_URL, name)

        return {'name': name, 'path_root': path_root, 'path_url': path_url}

    @staticmethod
    def Check_If_Image(path):

        if imghdr.what(path) in ['jpeg', 'png']:
            return True

        return False

    @staticmethod
    def Save_Image_From_Base64(image):

        base64_image = image.split(',', 1)[1]
        base64_data = image.split(';', 1)[0]
        base64_format = base64_data.split('/')[1]

        image_details = Dynamic_Base.\
            Generate_Image_Details(base64_format)

        # file with the name exists
        if os.path.exists(image_details['path_root']):
            Dynamic_Base.Save_Image_From_Base64(image)

        with open(image_details['path_root'], "wb") as file:
            file.write(base64.b64decode(base64_image))

        # if file is not image
        if not Dynamic_Base.Check_If_Image(image_details['path_root']):
            os.remove(image_details['path_root'])
            image_details['path_url'] = ''

        return image_details['path_url']

    @staticmethod
    def Save_Image_From_URL(url):

        binary_file = BytesIO(urlopen(url).read())
        image = Image.open(binary_file)

        image_details = Dynamic_Base.\
            Generate_Image_Details(image.format.lower())

        # file with the name exists
        if os.path.exists(image_details['path_root']):
            Dynamic_Base.Save_Image_From_URL(image)

        image.save(image_details['path_root'])

        # if file is not image
        if not Dynamic_Base.Check_If_Image(image_details['path_root']):
            os.remove(image_details['path_root'])
            image_details['path_url'] = ''

        return image_details['path_url']

    def __init__(self, request):
        self.request = request
        self.content = {}
        self.app_name = self.__module__.split('.')[0]
