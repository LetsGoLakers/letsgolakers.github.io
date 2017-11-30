import numpy as np
import pandas as pd
import matplotlib.pyplot as plt, matplotlib.image as impg
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn import svm
from PIL import Image
import numpy as np

def load_image( infilename ) :
    img = Image.open( infilename )
    img.load()
    data = np.asarray( img, dtype="int32" )
    return data

def save_image( npdata, outfilename ) :
    img = Image.fromarray( np.asarray( np.clip(npdata,0,255), dtype="uint8"), "L" )
    img.save( outfilename )

def invert(infilename):
    image = load_image(infilename)
    arr = image.reshape(-1)
    for i in range(len(arr)):
        arr[i] = 255 - arr[i]
    inverted = arr.reshape(28,28)
    return inverted

labeled_images = pd.read_csv("./train.csv")
images = labeled_images.iloc[0:5000,1:]
labels = labeled_images.iloc[0:5000,:1]
train_images, test_images, train_labels, test_labels, = train_test_split(images, labels, train_size = 0.8, random_state = 0)
i=1

#test_images[test_images>0]=1
#train_images[train_images>0]=1
img=train_images.iloc[i].as_matrix().reshape((28,28))
plt.imshow(img,cmap='binary')
plt.title(train_labels.iloc[i])
plt.show()
clf = RandomForestClassifier()
clf.fit(train_images, train_labels.values.ravel())
clf.score(test_images,test_labels)

test_data=pd.read_csv('./test.csv')
# test_data[test_data>0]=1
results=clf.predict(test_data[0:5000])
