from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import classification_report, confusion_matrix

cancer = load_breast_cancer()
print(cancer)
x = cancer['data']
y = cancer['target']
x_train, x_test, y_train, y_test = train_test_split(x,y)
scaler = StandardScaler()
scaler.fit(x_train)

x_train = scaler.transform(x_train)
x_test = scaler.transform(x_test)

clf = MLPClassifier(hidden_layer_sizes=(30,30,30))

clf.fit(x_train,y_train)
print(clf.score(x_test,y_test))
predictions = clf.predict(x_test)
print(confusion_matrix(y_test,predictions))
print(classification_report(y_test,predictions))
