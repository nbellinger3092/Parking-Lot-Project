import cv2
import sys

# The first argument is the image
image = cv2.imread("test2.jpg", 1)

# convert to grayscale
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# blur it
blurred_image = cv2.GaussianBlur(gray_image, (7, 7), 0)

#show image
cv2.imshow("Orignal Image", image)
cv2.imshow("Blurred image", blurred_image)

#Edge Detector
canny2 = cv2.Canny(blurred_image, 50, 150)
cv2.imshow("Canny with high thresholds", canny2)


#finds contours
im, contours, hierarchy= cv2.findContours(canny2, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

print("Number of objects found = ", len(contours))
cv2.drawContours(image, contours, -1, (0,255,0), 2)
cv2.imshow("objects Found", image)
cv2.waitKey(0)