import React, { useContext, useState, useEffect, useRef } from "react";
import axios from 'axios';
import {format} from 'react-string-format'
import {AuthContext} from '../App'
import {base_url} from '../ngrok_code'
// Create a new Context object that will be provided to descendants of
// the AuthProvider.

export const signIn = async (email, password) => {
  const{setUser} = useContext(AuthContext)
  const url = base_url.concat(format('/login/?email={0}&password={1}',email,password))
  axios.get(url).then((response)=>{
    if(response=="you've been successfully login in"){
      setUser(email)
    }
    return response;
  })  
};

  // The signUp function takes an email and password and uses the
  // emailPassword authentication provider to register the user.
export const signUp = async (email, password) => {
  const{setUser} = useContext(AuthContext)
    const url = base_url.concat("/user/create")
    axios.post(url,{
      "email":email,
      "password":password
    }).then((response)=>{
      //handle this in the front end
      if (response == "added profile"){
        setUser(email)
      }
      return response
    });
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
export const updateProfile = async(description = "", base64_image = "") =>{
  const user = useContext(AuthContext).user
  const url = base_url.concat('/user/update')
  axios.post(url,{
    "email":user,
    "description":description,
    "picture":base64_image
  }).then((response)=>{
    return response;
  });  
}
export const getProfile = async()=>{
  const user = useContext(AuthContext).user
  const url = base_url.concat(format('/user/get/?email={0}',{user}))
  axios.get(url).then((response)=>{
    return response;
  });
}