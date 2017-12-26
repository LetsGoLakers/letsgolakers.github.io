from flask import Flask, render_template, request
from scipy.misc import imsave, imread, imresize
import numpy as np
import keras.models
import re
import os
from load import *
import base64


app = Flask(__name__)
global model, graph
model = init()


def convertImage(imgData):
	imgstr = re.search(b'base64,(.*)',imgData).group(1)
	#print(imgstr)
	with open('output.png','wb') as output:
		output.write(base64.b64decode(imgstr))

@app.route("/")
def index():
    return render_template("index.html")
@app.route("/predict",methods = ["GET","POST"])
def predict():
    img_data = request.get_data()
    convertImage(img_data); resize_image("output.png","output.png",size=(28,28))
    x = imread("output.png", mode="L"); print(x.shape)
    x = np.invert(x)
    x = x.reshape(1,1,28,28)
    out = model.predict(x)
    response = np.array_str(np.argmax(out))
    return response
if __name__ == '__main__':
    port = int(os.environ.get("PORT",5000))
    app.run(host="0.0.0.0",port = port)
