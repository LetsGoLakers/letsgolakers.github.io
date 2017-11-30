import pandas as pd
from sklearn import datasets,svm,metrics
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt, matplotlib.image as impg
from sklearn.ensemble import RandomForestClassifier

digits = datasets.load_digits()

train_images, test_images, train_labels, test_labels = train_test_split(digits.images, digits.target, train_size = 0.8, random_state = 0)

images_and_labels = list(zip(train_images, train_labels))
for index, (image, label) in enumerate(images_and_labels[:4]):
    plt.subplot(2, 4, index + 1)
    plt.axis('off')
    plt.imshow(image, cmap=plt.cm.gray_r, interpolation='nearest')
    plt.title('Training: %i' % label)



train_features = train_images.reshape(len(train_images), -1)
test_features = test_images.reshape(len(test_images),-1)

clf = RandomForestClassifier()

clf.fit(train_features,train_labels)
print(clf.score(test_features,test_labels))
expected = test_labels
predicted = clf.predict(test_features)


images_and_predictions = list(zip(test_images, predicted,expected))
for index, (image, prediction,expectation) in enumerate(images_and_predictions[:4]):
    plt.subplot(2, 4, index+5)
    plt.axis('off')
    plt.imshow(image, cmap=plt.cm.gray_r, interpolation='nearest')
    plt.title('Prediction: %i Expectation: %i' % (prediction,expectation ))

plt.show()
