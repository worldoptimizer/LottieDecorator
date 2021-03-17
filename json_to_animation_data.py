#!/usr/bin/python
#
# Crude little Python script to convert 
# a bunch of Lottie files to into a list of
# inlined animationdData in a JavaScript file. 
#
# MIT License, Max Ziebell 2021
#

import os
rDir = r'.'
f= open("LottieFiles.js","w")
for fil in os.listdir(rDir):
    if fil.endswith(".json"):
    	lf=open(fil, "r")
    	contents =lf.read()
    	lf.close()
        f.write("window['"+fil.replace('.json','')+"']=JSON.parse('"+contents+"');\n")
print "done"
