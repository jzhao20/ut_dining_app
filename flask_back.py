import os
import scrape
import image_classification
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from datetime import datetime, date
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://jzhao20:xyz89012@ut-dining-hall-app.cpyxs.mongodb.net/ut-dining-hall-app?retryWrites=true&w=majority"
app.config["MONGO_DBNAME"] = "ut-dining-hall-app"
mongo = PyMongo(app)

@app.route('/halls/get', methods = ['GET'])
def get_halls():
    #return a jsonified array 
    return jsonify(scrape.get_dining_halls())
@app.route('/meal/get/', methods = ['GET'])
def call_func():

    date_specified = request.args["date"]
    date_adjusted = datetime.strptime(date_specified, "%m/%d/%Y")
    date_adjusted = date_adjusted.strftime("%m/%d/%Y")
    cur_date = date.today()
    cur_date = cur_date.strftime("%m/%d/%Y")

    # if date != cur_date:
                # return "menu not found for this date"
    access_dict = request.args["dining_hall"]+ "-"+request.args["meal_time"]
    dates = mongo.db.stored_dates
    database_to_store = dates.find_one({'date':date_specified})
    if database_to_store != None:
        if "data" in database_to_store:
            for i in database_to_store["data"]:
                if i["dining_hall_and_meal"]==access_dict:
                    return i["menu"]
        if date_adjusted != cur_date:
            return "menu not found for this date"
        res = scrape.call(request.args)
        dates.find_one_and_update({"date":date_specified}, {"$push":{'data':{'dining_hall_and_meal':access_dict, 'menu':res}}})
    else:
        #create database
        if date_adjusted != cur_date:
            return "menu not found for this date"
        res = scrape.call(request.args)
        dates.insert_one({'date':date_specified, 'data':[{'dining_hall_and_meal':access_dict, 'menu':res}]})
    return res

@app.route('/user/get/', methods = ['GET'])
def user_profile():
    username = request.args["name"]
    names = mongo.db.user_profiles
    database = names.find_one({"username":username})
    if database != None:
        description = database["description"]
        picture = database["picture"]
        nutrition = database["nut_facts"]
        return {"username":username,"description":description,"picture":picture,"nut_facts":nutrition}
    else:
        #can't happen only used for debugging purposes
        return "profile doesn't exist"    

@app.route('/user/get_nut/', methods = ['GET'])
def get_nutrition_facts():
    data = rqeuest.args
    username = data["name"]
    date_of_interest = data["date"]
    names = mongo.db.user_profiles
    database = names.find_one({"username":username})
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
    username = data["name"]
    description = data["description"]
    profile_picture = data["picture"]
    names = mongo.db.user_profiles
    database = names.find_one({"username":username})
    if database == None:
        #this can't happens since the user it always asking just for debugging purposes
        return "profile not found"
    else:
        if description == None and profile_picture == None:
            return "can't change username"
        if description == None:
            description = database["description"]
        if profile_picture == None:
            profile_picture = database["picture"]
        names.update_one(database,{"$set":{"description":description,"picture":profile_picture}})
    return "updated profile"

@app.route('/user/update_meal/', methods = ['POST'])
def update_meal():
    #this can't be done by the user
    #get the current dictionary and add the stuff to it
    data = request.get_json()
    #read json for the names of all the nutrition facts
    username = data["name"]
    cur_date = date.today()
    cur_date = cur_date.strftime("%m/%d/%Y")
    #cur_date is the ony date that can be updated
    keys = data["nut_facts"].keys()
    data = data["nut_facts"]
    names = mongodb.user_profiles
    database = names.find_one({"username":username})
    if database == None:
        return "profile not found"
    dates = database["nut_facts"].keys()
    if cur_date in dates:
        #update that dictionary
        nut_facts = dates[cur_date]
        for key in keys:
            if key not in nut_facts.keys():
                nut_facts.update({key : data[key]})  
            else:
                nut_facts.update({key : data[key]+nut_facts[key]})
        names.update({database,{"$set":{cur_date:nut_facts}}})
    else:
        #doesn't exist need to insert the nutrition facts for the day
        dictionary_to_insert = {cur_date:data}
        database["nut_facts"].insert_one(dictionary_to_insert)

@app.route("/user/check", methods = ['GET'])
def check():
    names = mongo.db.user_profiles
    if names.find_one({"username":request.args["name"]}):
        return "false"
    return "true"

@app.route("/login", methods = ['GET'])
def login():
    names = mongo.db.user_profiles
    username = request.args["name"]
    password = request.args["password"]
    database = names.find_one({"username":username})
    if database != None and database["password"] == password:
        return "true"
    return "false"

@app.route('/user/create', methods = ['POST'])
def create_user():
    data = request.get_json()
    names = mongo.db.user_profiles
    username = data["name"]
    password = data["password"]
    description = data["description"]
    profile_picture = data["picture"]
    if names.find_one({"username":username}):
        return "profile already in use"
    else:
        #add the stuff to it 
        names.insert_one({'username':username,"password":password,"description":description,"picture":profile_picture, "nut_facts":[]})
        return "added profile"

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
