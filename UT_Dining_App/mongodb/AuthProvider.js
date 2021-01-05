import React, { useContext, useState, useEffect, useRef } from "react";
import { getRealmApp } from "../getRealmApp";

// Access the Realm App.
const app = useContext(getRealmApp());

// Create a new Context object that will be provided to descendants of
// the AuthProvider.
const AuthContext = React.createContext({
  user:"",
})

export const signIn = async (email, password) => {
    const [user, setUser] = React.useState("");
    const check = {
      "email":email,
      "password":password,
    };
    await app.collection.findOne(check).then(result=>{
      if(result){
        setUser(result._id)
      }
      else{
        console.warn("incorrect password or the account isn't in use")
      }
    });
  };

  // The signUp function takes an email and password and uses the
  // emailPassword authentication provider to register the user.
export const signUp = async (email, password) => {
    const check  = {
      "email":email,
    };
    const profile = {
      "$set":{
        "email":email,
        "password":password,
        "description":"",
        "picture":"",
        "nut_facts":[],
      }
    };
    await app.collection.findOne(check).then(result =>{
      if (result){
        console.warn("email already in use")
      }
      else{
        app.collection.insertOne(profile)
      }
    });
    signIn(email, password);
  };

  // The signOut function calls the logOut function on the currently
  // logged in user
export const signOut = () => {
  const [user, setUser] = React.useState("");
    if (user == null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    setUser(null);
  };
export const updateProfile = async(description, base64_image) =>{
    const check = {
      "_id":user,
    }
    const profile = {
      "$set":{
        "description":"",
        "picture":"",
      }
    };
    await app.collection.findOne(check).then(result=>{
      result.updateOne(profile)
    });
  };
export const get_nut = async(id) =>{
    const check = {
      "_id":user,
    }
    await app.collection.findOne(check).then(result=>{
      return result["nut_facts"]
    })
  }
 
