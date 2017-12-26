import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier

url = "https://archive.ics.uci.edu/ml/machine-learning-databases/parkinsons/parkinsons.data"
data = pd.read_csv(url)
print(data.shape)

train,test = train_test_split(data,test_size = 0.3)
y_train = train["status"]
y_test = test["status"]
x_train = train.drop("status",1)
x_test = test.drop("status",1)
x_train = train.drop("name",1)
x_test = test.drop("name",1)
print(x_train)

scaler = StandardScaler()
scaler.fit(x_train)

x_train = scaler.transform(x_train)
x_test = scaler.transform(x_test)

clf = MLPClassifier(hidden_layer_sizes=(30,30,30))

clf.fit(x_train,y_train)
print(clf.score(x_test,y_test))
predictions = clf.predict(x_test)
