import numpy as np
import keras.models
from scipy.misc import imread, imresize,imshow
from PIL import Image

def resize_image(input_image_path,
                 output_image_path,
                 size):
    original_image = Image.open(input_image_path)
    width, height = original_image.size
    resized_image = original_image.resize(size)
    width, height = resized_image.size
    resized_image.save(output_image_path)

def invert(infilename):
    image = load_image(infilename)
    arr = image.reshape(-1)
    for i in range(len(arr)):
        arr[i] = 255 - arr[i]
    inverted = arr.reshape(28,28)
    return inverted

def load_image( infilename ) :
    img = Image.open( infilename )
    img.load()
    data = np.asarray( img, dtype="int32" )
    return data

def init():
    loaded_model = keras.models.load_model("model.h5")
    return loaded_model
