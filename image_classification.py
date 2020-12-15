import cv2 as cv
import numpy as np
import os
from os import path
training_data = "knn_data.npz"
#load the data which will then contain the
def process_images(image):
    im_bytes = base64.b64decode(image)
    im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
    img = cv.imdecode(im_arr, flags=cv.IMREAD_COLOR)
    img = cv.cvtColor(img,cv.COLOR_BGR2GRAY)
    return img

def classify(image):
    with np.load(training_data) as data:
        train = data['train']
        labels = data['train_labels']
        knn = cv.m1.KNearest_create()
        knn.train(training_data, cv.m1.ROW_SAMPLE, train_labels)
        ret, result, neighbours, dist = knn.findNearest(process_images(image))
        return result
    return "file doesn't exist"


def update_training(image, type, load = None):
    if not os.path.exists(training_data):
        f = open(training_data, "x")
        f.close()
        if load != None:
            label = []
            train = []
            for i in load:
                train.append(i["base64"])
                label.append(i["name"])
            np.savez(training_data, train = train, train_labels = labels)
    with np.load(training_data)as data:
        train = data['train'].append(process_images(image))
        labels = data['train_labels']
        np.savez(training_data, train = train, train_labels = labels)
