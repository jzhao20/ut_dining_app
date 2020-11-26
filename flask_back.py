import os
import scrape
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from datetime import datetime, date
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://jzhao20:xyz89012@ut-dining-hall-app.cpyxs.mongodb.net/ut-dining-hall-app?retryWrites=true&w=majority"
app.config["MONGO_DBNAME"] = "ut-dining-hall-app"
mongo = PyMongo(app)

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
        print("is this happening")
        if date_adjusted != cur_date:
            print(date_adjusted)
            print(cur_date)
            return "menu not found for this date"
        res = scrape.call(request.args)
        dates.insert_one({'date':date_specified, 'data':[{'dining_hall_and_meal':access_dict, 'menu':res}]})
    return res

@app.route('/user/get/', methods = ['GET'])
def user_profile():
    username = request.args["name"]
    names = mongo.db.user_profiles
    if names.find_one({"username":username}) != None:
        return names.find_one({"username":username})
    else:
        #can't happen only used for debugging purposes
        return "profile doesn't exist"    

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
        names.update_one(database,{"$set":{"description":description,"picture":profile_picture}})

@app.route('/user/update_meal/')
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
        #doesn't exist need to insert the nutritoin facts for the day
        dictionary_to_insert = {cur_date:data}
        database["nut_facts"].insert_one(dictionary_to_insert)

@app.route("/user/check", methods = ['GET'])
def check():
    names = mongodb.user_profiles
    if names.find_one({"username":request.args["name"]}):
        return "false"
    return "true"

@app.route("/login", methods = ['GET'])
def login():
    names = mongodb.user_profiles
    username = request.args["name"]
    password = request.args["password"]
    databse = names.find_one({"username":username})
    if database != None and database["password"] == password:
        return "true"
    return "false"

@app.route('/user/create', methods = ['POST'])
def create_user():
    print("hello there")
    data = request.get_json()
    print(data)
    names = mongo.db.user_profiles
    username = data["name"]
    password = data["password"]
    description = data["description"]
    profile_picture = data["picture"]
    if names.find_one({"username":username}):
        return "profile already in use"
    else:
        #add the stuff to it 
        names.insert_one({'username':username,"password":password,"description":description,"profile_picture":profile_picture, "nut_facts":[]})
        return "added profile"
app.run()
