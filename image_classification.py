import cv2 as cv
import numpy as np 

#load the data which will then contain the 
def process_images(image):
	im_bytes = base64.b64decode(image)
    im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
    img = cv.imdecode(im_arr, flags=cv.IMREAD_COLOR)
    img = cv.cvtColor(img,cv.COLOR_BGR2GRAY)
    return img

def classify(image, images):
	training_data = []
	train_labels = []
	for key in images:
		train_labes += len(images[key])*[key]
		data = [process_images(x) for x in images[key]]
		training_data.extend(data)
	knn = cv.m1.KNearest_create()
	knn.train(training_data, cv.m1.ROW_SAMPLE, train_labels)
	ret, result, neighbours, dist = knn.findNearest(process_images(image))
	return result