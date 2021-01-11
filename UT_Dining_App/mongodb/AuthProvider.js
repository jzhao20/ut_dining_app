import React, { useContext, useState, useEffect, useRef } from "react";
import axios from 'axios';
import {format} from 'react-string-format'
import {AuthContext} from '../App'
import {base_url} from '../ngrok_code'

export const signIn = async (email, password) => {
  //const{setUser} = useContext(AuthContext)
  const url = base_url.concat(format('/login?email={0}&password={1}',email,password))
  const value = await axios.get(url)
  //console.warn(value["data"])
  return value["data"].toString()
};

  // The signUp function takes an email and password and uses the
  // emailPassword authentication provider to register the user.
export const signUp = async (email, password) => {
  const url = base_url.concat("/user/create")
    const value = await axios.post(url,{
      "email":email,
      "password":password
    })
    return value["data"].toString()
 };

  // The signOut function calls the logOut function on the currently
  // logged in user
export const signOut = () => {
  const user = useContext(AuthContext).user
  const{setUser} = useContext(AuthContext)
  if (user == null) {
    set_message("Not logged in, can't log out!");
    return;
  }
  else{
    set_message("Successfully logged out");
  }
  setUser("");
  };
export const updateProfile = async(description = "", base64_image = "", email) =>{
  const url = base_url.concat('/user/update')
  const message = await axios.post(url,{
    "email":email,
    "description":description,
    "picture":base64_image
  })    
  return message["data"].toString()  
}
export const getProfile = async(email)=>{
  const url = base_url.concat(format('/user/get/?email={0}',email))
  const val = await axios.get(url)
  return val["data"]
}