import cv2
import sys
import numpy as py



car_cascade=cv2.CascadeClassifier('cars.xml')

img = cv2.imread('test2.jpg')

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

cars = car_cascade.detectMultiScale(gray,1.1,3)

ncars = 0
for (x,y,w,h) in cars:
    img = cv2.rectangle(img,(x,y),(x+w,y+h), (0,0,255),2)
    ncars = ncars + 1

print("hey")
cv2.imshow('img',img)
print("hi")
#cv2.waitKey(0)
print("ok")
cv2.destroyAllWindows()
print("helloooo")
print("Cars:", ncars)