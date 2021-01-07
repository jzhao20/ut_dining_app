import os
import scrape
import image_classification
import json
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from datetime import datetime, date
import re
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://jzhao20:udha2020@ut-dining-hall-app.cpyxs.mongodb.net/ut-dining-hall-app?retryWrites=true&w=majority"
app.config["MONGO_DBNAME"] = "ut-dining-hall-app"
mongo = PyMongo(app)

@app.route('/halls/get', methods = ['GET'])
def get_halls():
	if request.args["force"] == "True":
		val = json.dumps(scrape.get_dining_halls())
		database = mongo.db.dining_halls
		database_to_edit = database.find()
		try:
			database.update_one(database_to_edit[0], {"$set":{"dining_halls":val}})
		except:
			print("here")
			database.insert_one({"dining_halls":val})
		return val
	else:
		database = mongo.db.dining_halls
		return database.find()[0]["dining_halls"]


def update_database(date_specified, dining_hall, meal_time):
    date_adjusted = datetime.strptime(date_specified, "%m/%d/%Y")
    date_adjusted = date_adjusted.strftime("%m/%d/%Y")
    cur_date = date.today()
    cur_date = cur_date.strftime("%m/%d/%Y")
    access_dict = dining_hall+"-"+meal_time
    dates = mongo.db.stored_dates
    database_to_store = dates.find_one({'date':date_specified})
    args = {"dining_hall":dining_hall,"meal_time":meal_time}
    if database_to_store != None:
        if "data" in database_to_store:
            for i in database_to_store["data"]:
                if i["dining_hall_and_meal"]==access_dict:
                    return i["menu"]
        if date_adjusted != cur_date:
            return "menu not found for this date"
        res = scrape.call(args)
        dates.find_one_and_update({"date":date_specified}, {"$push":{'data':{'dining_hall_and_meal':access_dict, 'menu':res}}})
    else:
        #create database
        if date_adjusted != cur_date:
            return "menu not found for this date"
        res = scrape.call(args)
        dates.insert_one({'date':date_specified, 'data':[{'dining_hall_and_meal':access_dict, 'menu':res}]})
    return res

@app.route('/meal/get/', methods = ['GET'])
def call_func():
    date_specified = request.args["date"]
    dining_hall = request.args["dining_hall"]
    meal_time = request.args["meal_time"]
    return update_database(date_specified, dining_hall, meal_time)

@app.route('/meal/get_item', methods = ['GET'])
def get_item():
    data = request.args
    date = data["date"]
    dining_hall = data["dining_hall"]
    meal_time = data["meal_time"]
    access_dict = dining_hall+"-"+"meal_time"
    food = data["food"]
    dates = mongo.db.stored_dates
    database_to_read = dates.find_one({'date':date})
    if database_to_read == None or database_to_read.find_one({"dining_hall_and_meal":access_dict})==None:
        update_database(date, dining_hall, meal_time)
        database_to_read = dates.find_one({'date':cur_date})
    database_to_read = database_to_read.find_one({"dining_hall_and_meal":access_dict})["menu"]
    try:
        return database_to_read[food]
    except:
        return "item doesn't exist"

@app.route('/user/get/', methods = ['GET'])
def user_profile():
    email = request.args["email"]
    emails = mongo.db.user_profiles
    database = emails.find_one({"email":email})
    if database != None:
        description = database["description"]
        picture = database["picture"]
        nutrition = database["nut_facts"]
        return {"email":email,"description":description,"picture":picture,"nut_facts":nutrition}
    else:
        #can't happen only used for debugging purposes
        return "profile doesn't exist"

@app.route('/user/get_nut/', methods = ['GET'])
def get_nutrition_facts():
    data = rqeuest.args
    email = data["email"]
    date_of_interest = data["date"]
    emails = mongo.db.user_profiles
    database = emails.find_one({"email":email})
    if database != None:
        dates = database["nut_facts"]
        if date_of_interest not in dates:
            return "no nutrition facts for that day"
        else:
            ret = {}
            dict_to_read = dates[date_of_interest]
            for key in dict_to_read.keys():
                ret.update({key:dict_to_read[key]})
            return ret
    else:
        return "profile not found"

@app.route('/user/update', methods = ['POST'])
def update_profile():
    data = request.get_json()
    email = data["email"]
    description = data["description"]
    profile_picture = data["picture"]
    emails = mongo.db.user_profiles
    database = emails.find_one({"email":email})
    if database == None:
        #this can't happens since the user it always asking just for debugging purposes
        return "profile not found"
    else:
        if description == database["description"] and profile_picture == database["picture"]:
            return "please edit profile or click cancel"
        emails.update_one(database,{"$set":{"description":description,"picture":profile_picture}})
    return "updated profile"

def get_dictionary(database, food):
    data = {}
    regex = re.compile(r"[-+]?\d*\.\d+|\d+")
    other_regex = re.compile('[0-9.]')
    for item in food.keys():
        name = item
        try:
            temp_data = database[name]
            for nuts in temp_data.keys():
                key = nuts.strip()
                if "Serving" not in nuts:
                    #get the values
                    try:
                        number = round(float(regex.findall(temp_data[nuts])[0])*food[item],1)
                        add = round(float(regex.findall(data[key])[0])+number,1)
                        data[key] = str(add)+other_regex.sub('',data[key])
                    except:
                        data.update({key:temp_data[nuts]})
        except:
            continue
    return data

@app.route('/user/update_meal/', methods = ['POST'])
def update_meal():
    #this can't be done by the user
    #get the current dictionary and add the stuff to it
    data = request.get_json()
    #read json for the names of all the nutrition facts
    email = data["email"]
    dining_hall = data["dining_hall"]
    meal_time = data["meal_time"]
    access_dict = dining_hall+"-"+meal_time
    try:
        cur_date = data["date"]
    except:
        cur_date = date.today()
        cur_date = cur_date.strftime("%m/%d/%Y")
    #cur_date is the ony date that can be updated
    #food contains a dicationary food item name and then the number of servings
    food = data["food"]
    dates = mongo.db.stored_dates
    database_to_read = dates.find_one({'date':cur_date})
    if database_to_read == None:
        update_database(cur_date, dining_hall, meal_time)
        database_to_read = dates.find_one({'date':cur_date})
    try:
        database_to_read = database_to_read["data"]
    except:
        return "failed couldn't get dining hall and meal time"
    f = lambda x: x["dining_hall_and_meal"]==access_dict
    element = next((x for x in database_to_read if f(x)), None)
    #this is going to be the nut facts
    if element == None:
        return "data wasn't found"
    database_to_read = element["menu"]
    data = get_dictionary(database_to_read, food)
    emails = mongo.db.user_profiles
    database = emails.find_one({"email":email})
    counter = 0
    database_to_edit = None
    for i in database["nut_facts"]:
        if i['date'] == cur_date:
            database_to_edit = i
            break
        counter+=1
    if database_to_edit is not None:
            #update that dictionary
        nut_facts = database_to_edit["data"]
        regex = re.compile(r"[-+]?\d*\.\d+|\d+")
        other_regex = re.compile('[0-9.]')
        for key in data:
            if key not in nut_facts.keys():
                nut_facts.update({key : data[key]})
            else:
                #stupid regex stuff
                number = float(regex.findall(data[key])[0])
                add = float(regex.findall(nut_facts[key])[0])
                total = round(add+number,2)
                nut_facts.update({key : str(total)+other_regex.sub('',nut_facts[key])})
        database["nut_facts"][counter] = {"date":cur_date, "data":nut_facts}
        emails.find_one_and_update({"email":email},{"$set":{"nut_facts":database["nut_facts"]}})
    else:
        emails.find_one_and_update({"email":email},{"$push":{"nut_facts":{"date":cur_date,"data":data}}})
    return "finished"

@app.route("/user/update_meal_test", methods = ['POST'])
def update_meal_test():
    data = request.get_json()
    #read json for the names of all the nutrition facts
    emails = mongo.db.user_profiles
    email = data["email"]
    try:
        cur_date = data["date"]
    except:
        cur_date = date.today()
        cur_date = cur_date.strftime("%m/%d/%Y")
    #cur_date is the ony date that can be updated
    #food contains a dicationary food item name and then the number of servings
    data = data["nut_facts"]
    database = emails.find_one({"email":email})
    counter = 0
    database_to_edit = None
    for i in database["nut_facts"]:
        if i['date'] == cur_date:
            database_to_edit = i
            break
        counter+=1
    if database_to_edit is not None:
            #update that dictionary
        nut_facts = database_to_edit["data"]
        regex = re.compile(r"[-+]?\d*\.\d+|\d+")
        other_regex = re.compile('[0-9.]')
        for key in data:
            if key not in nut_facts.keys():
                nut_facts.update({key : data[key]})
            else:
                #stupid regex stuff
                number = float(regex.findall(data[key])[0])
                add = float(regex.findall(nut_facts[key])[0])
                total = add+number
                nut_facts.update({key : str(total)+other_regex.sub('',nut_facts[key])})
        database["nut_facts"][counter] = {"date":cur_date, "data":nut_facts}
        emails.find_one_and_update({"email":email},{"$set":{"nut_facts":database["nut_facts"]}})
    else:
        emails.find_one_and_update({"email":email},{"$push":{"nut_facts":{"date":cur_date,"data":data}}})
    return "hello"
@app.route("/user/check", methods = ['GET'])
def check(email = ""):
    emails = mongo.db.user_profiles
    if email != "":
        if emails.find_one({"email":email}):
            return True
        return False
    if emails.find_one({"email":request.args["email"]}):
        return "false"
    return "true"

@app.route("/login", methods = ['GET'])
def login():
    emails = mongo.db.user_profiles
    email = request.args["email"]
    password = request.args["password"]
    database = emails.find_one({"email":email})
    if database is None:
        return "email not found"
    elif database["password"]!= password:
        return "password is incorrect"
    else:
        return "you've been successfully logged in"

@app.route('/user/create', methods = ['POST'])
def create_user():
    data = request.get_json()
    emails = mongo.db.user_profiles
    email = data["email"]
    if check(email = email):
        return "email already in use"
    password = data["password"]
    try:
        description = data["description"]
    except:
        description = ""
    try:
        profile_picture = data["picture"]
    except:
        profile_picture = ""
    else:
        #add the stuff to it
        emails.insert_one({'email':email,"password":password,"description":description,"picture":profile_picture, "nut_facts":[]})
        return "added profile logging you in"

@app.route('/image/classify', methods = ['POST'])
def classify():
    data = request.get_json()
    image = data["image"]
    if images == None:
        return "not enough training data"
    else:
        return image_classification.classify(image)

@app.route('/image/results', methods = ['POST'])
def update_data():
    training_data = "knn_data.npz"
    data = request.get_json()
    image = data["image"]
    answer = bool(data["classification"])
    correct = data["correct"]
    #update the file and check if greater than 90% at which point don't update it unless you got it wrong
    file = open("classification_performance.txt", "w+")
    metadata = file.read()
    if metadata == "":
            #file is empty and that means
        metadata = str(int(answer)) +" 1 1"
    else:
        split = [int(num) for num in metadata.split(" ")]
        if answer == True and split[2] >= 10000 and float(split[0])/float(split[1])>=.9:
            split[0]+=1
            split[1]+=1
            file.truncate()
            file.write(" ".join(split))
            return
        else:
            split[0]+=int(answer)
            split[1] +=1
            split[2]+=1
            file.truncate()
            file.write(" ".join(split))
    images = mongo.db.food_images
    if not os.path.exists(training_data):
        image_classification(image, answer, images)
    else:
        image_classification.update_training(image, answer)
    images.insert_one({"name":answer, "base64": image_classification.process_images(image)})


app.run()
