from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn import svm

clf = svm.SVC()

x = [[10],[20],[30],[40],[50],[60],[70],[89],[90],[100]]

y = ['F','F','F','F','F','D','C','B','A','A']

clf.fit(x,y)
def ask ():
    print(clf.predict(input("Enter number to convert to grade: \n")))
    ip = input("Would you like to run this again? Enter 'Y' for yes \n")
    if ip is 'Y':
        ask()
ask()
