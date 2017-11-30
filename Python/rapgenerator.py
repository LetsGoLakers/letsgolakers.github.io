import random, re

def test_markov(startword):
    rap_lib = {}
    add_to_lib("lyrics.txt",rap_lib)
    return make_rap(startword,rap_lib)
def add_to_lib(fileName,currLib):
    f = open(fileName,'r')
    words = re.sub("\n","\n", f.read()).split(' ')
    curr = 0
    while curr < len(words) -1:
