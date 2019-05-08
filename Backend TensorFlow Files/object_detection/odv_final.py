#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""

Created by TensorFlow Authors
Edited by Nick Bellinger & Jennifer Sullivan


"""


# Imports

import numpy
import connect
import json
import requests
import pprint
import time
import numpy as np
import os
import six.moves.urllib as urllib
import sys
import tarfile
import tensorflow as tf
import zipfile

from distutils.version import StrictVersion
from collections import defaultdict
from io import StringIO
from matplotlib import pyplot as plt
from PIL import Image

import cv2
# Video Sources

# Lot A Cameras
video_src0 ='rtsp://SeniorDesign:1Hwe2Dxy@10.9.27.24:554/media/video1'
video_src1 ='rtsp://SeniorDesign:1Hwe2Dxy@10.9.27.27:554/media/video1'
video_src2 ='rtsp://SeniorDesign:1Hwe2Dxy@10.9.27.28:554/out.h264'
video_src3 ='rtsp://SeniorDesign:1Hwe2Dxy@10.9.27.29:554/media/video1'
video_src4 ='rtsp://SeniorDesign:1Hwe2Dxy@10.9.27.30:554/media/video1'
video_src5 ='rtsp://SeniorDesign:1Hwe2Dxy@10.9.27.31:554/media/video1'

# This is needed since the notebook is stored in the object_detection folder.
sys.path.append("..")
from object_detection.utils import ops as utils_ops

if StrictVersion(tf.__version__) < StrictVersion('1.9.0'):
  raise ImportError('Please upgrade your TensorFlow installation to v1.9.* or later!')

from object_detection.utils import label_map_util

from object_detection.utils import visualization_utils as vis_util

# Model to be loaded into TensorFlow
MODEL_NAME = 'faster_rcnn_nas_coco_2018_01_28'
MODEL_FILE = MODEL_NAME + '.tar.gz'

# Path to frozen detection graph. This is the actual model that is used for the object detection.
PATH_TO_FROZEN_GRAPH = MODEL_NAME + '/frozen_inference_graph.pb'

# List of the strings that is used to add correct label for each box.
PATH_TO_LABELS = os.path.join('data', 'mscoco_label_map.pbtxt')

# Open model to be loaded into TensorFlow
tar_file = tarfile.open(MODEL_FILE)
for file in tar_file.getmembers():
  file_name = os.path.basename(file.name)
  if 'frozen_inference_graph.pb' in file_name:
    tar_file.extract(file, os.getcwd())

#Load graph into TensorFlow
detection_graph = tf.Graph()
with detection_graph.as_default():
  od_graph_def = tf.GraphDef()
  with tf.gfile.GFile(PATH_TO_FROZEN_GRAPH, 'rb') as fid:
    serialized_graph = fid.read()
    od_graph_def.ParseFromString(serialized_graph)
    tf.import_graph_def(od_graph_def, name='')

category_index = label_map_util.create_category_index_from_labelmap(PATH_TO_LABELS, use_display_name=True)

def Inference(video_src,cam_num):
            #######################################################################
            #   Camera Inference
            #######################################################################
            try:                    
                cap = cv2.VideoCapture(video_src)
                ret, image_np = cap.read()
                
                # Expand dimensions since the model expects images to have shape: [1, None, None, 3]
                image_np_expanded = np.expand_dims(image_np, axis=0)
                image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')
                #Each box represents a part of the image where a particular object was detected
                boxes = detection_graph.get_tensor_by_name('detection_boxes:0')
                #Each score represents the level of confidence for each object
                #Score is shown on the result image, together with the class Label.
                scores = detection_graph.get_tensor_by_name('detection_scores:0')
                classes = detection_graph.get_tensor_by_name('detection_classes:0')
                num_detections = detection_graph.get_tensor_by_name('num_detections:0')
                # Actual detection.
                (boxes, scores, classes, num_detections) = sess.run(
                        [boxes, scores, classes, num_detections],
                        feed_dict={image_tensor: image_np_expanded})
                # Visualization of the results of a detection.
                vis_util.visualize_boxes_and_labels_on_image_array(
                        image_np,
                        np.squeeze(boxes),
                        np.squeeze(classes).astype(np.int32),
                        np.squeeze(scores),
                        category_index,
                        use_normalized_coordinates=True,
                        line_thickness=8)
                return num_detections
            except:
                print("Error with import of camera " + str(cam_num))
                Inference(video_src,cam_num)

# Runs inference and totals detections by each camera
# Try Excepts handle errors thrown when cameras sometime returns a NULL instead of a bytestream
with detection_graph.as_default():
    with tf.Session(graph=detection_graph) as sess:
        while True:
            totalDetections = 0
            try:
                totalDetections = totalDetections + Inference(video_src0,0)
            except:
                totalDetections = totalDetections + Inference(video_src0,0)
            try:
                totalDetections = totalDetections + Inference(video_src1,1)
            except:
                totalDetections = totalDetections + Inference(video_src1,1)
            try:
                totalDetections = totalDetections + Inference(video_src2,2)
            except:
                totalDetections = totalDetections + Inference(video_src2,2)
            try:
                totalDetections = totalDetections + Inference(video_src3,3)
            except:
                totalDetections = totalDetections + Inference(video_src3,3)
            try:
                totalDetections = totalDetections + Inference(video_src4,4)
            except:
                totalDetections = totalDetections + Inference(video_src4,4)
            try:
                totalDetections = totalDetections + Inference(video_src5,5)
            except:
                totalDetections = totalDetections + Inference(video_src5,5)

            # TEST LOT DATA
            lot = "A"
            print(lot)
            # Number of spaces minus number of vehicles detected
            print(200-totalDetections)

            # Timestamp of the data to be sent
            detectionTime = time.ctime()
            print(detectionTime)
            
            # Send to java server
            try:
                url='http://159.203.181.128:8080/parking-app/main'
                data = (lot + '\n' + str(7) + '\n' +detectionTime)
                headers = {'Content-type': 'text'}
                response=requests.post(url,data,headers=headers,verify=False)
            except:
                print("Error sending data to Java servlet at url: " + url)

            ## Database
            #Convert numpy array to string
            string_num_detections = numpy.array2string(num_detections)
            #Send number of vehicles to Database and strip brakcets and '.' from TF output
            connect.postDatabase(string_num_detections.strip('[.]'))


