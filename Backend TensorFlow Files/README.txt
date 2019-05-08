##Nicholas Bellinger
##Last edited 5/7/19

## The files contained in the object_detection folder are not all my own work
## Only the cameraTest.py and odv_final.py are my own work, the rest, 
## except for faster_rcnn_nas_coco_2018_01_28, are property of Google
## The faster_rcnn_nas_coco_2018_01_28 dataset is the property of Microsoft. 
## I altered it by re-training the model to fit the needs
## of the ParkSmart application.

## TensorFlow installation:

1)Install Python
	- Need version no later than 3.6.8 as 3.7+ is not currently compatible with TensorFlow
2)Using pip, install Python-tk, Pillow, lxml, matplotlib, cython, contextlib2 and tensorflow
	- If GPU processing desired, replace pip install tensorflow with pip install tensorflow-GPU
	- Keep in mind, there is a separate installtion process for GPU, 
	- as Nvidia Cuda toolkit and drivers need to be installed as well
	
	- If desired, Anaconda provides an easy way to install both TensorFlow 
	- and TensorFlow-GPU with their dependent libraries in a virtual environment
3)You should now be ready to run the odv_final.py script
	- The script reads in the security cameras by RTSP protocol with their IP addresses and login info