import React, { useContext, useState, useEffect, useRef } from "react";
import axios from 'axios';
import {format} from 'react-string-format'

const base_url = "http://5703ee1b9ecc.ngrok.io"
// Create a new Context object that will be provided to descendants of
// the AuthProvider.
const AuthContext = React.createContext({
  user_email:"",
  message:""
});

export const signIn = async (email, password) => {
  const[user_email, set_email] = useState("")
  const[message, set_message] = useState("")
  const url = base_url.concat(format('?email={0}&password={1}',email,password))
  axios.get(url).then((response)=>{
    if(response=="you've been successfully login in"){
      set_email(email)
    }
    set_message(response)
  })  
};

  // The signUp function takes an email and password and uses the
  // emailPassword authentication provider to register the user.
export const signUp = async (email, password) => {
    const[message, set_message] = useState("")  
    const url = base_url.concat("/user/create")
    axios.post(url,{
      "email":email,
      "password":password
    }).then((response)=>{
      //handle this in the front end
      set_message(response)
    });
  };

  // The signOut function calls the logOut function on the currently
  // logged in user
export const signOut = () => {
  const [user_email, set_email] = React.useState("");
  const [message, set_message] = useState("");
  if (user_email == null) {
    set_message("Not logged in, can't log out!");
    return;
  }
  else{
    set_message("Successfully logged out");
  }
  set_email("");
  };
export const updateProfile = async(description = "", base64_image = "") =>{
  const[message, set_message] = useState("")
  const url = base_url.concat('/user/update')
  axios.post(url,{
    "email":email,
    "description":description,
    "picture":base64_image
  }).then((response)=>{
    set_message(response)
  });  
}
 
