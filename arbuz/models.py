from django.db import models
from arbuz.settings import BASE_DIR
import os


class Base_Model:

    def Set_Variables(self):
        pass

    def __init__(self):
        self.image_dir = None
        self.Set_Variables()



class Abstract_Model(Base_Model, models.Model):

    def Save_Image(self, name):

        if not name:
            return

        if self.image_dir in str(name):
            return

        image_format = os.path.splitext(name)[1]
        old_path = BASE_DIR + name
        new_path = self.image_dir + '{0}{1}'\
            .format(self.pk, image_format)

        os.rename(old_path, BASE_DIR + new_path)
        self.image.name = new_path
        self.save()

    class Meta:
        abstract = True

    def __init__(self, *args, **kwargs):
        models.Model.__init__(self, *args, **kwargs)
        Base_Model.__init__(self)
