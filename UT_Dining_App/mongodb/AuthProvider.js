import React, { useContext, useState, useEffect, useRef } from "react";
import axios from 'axios';
import {format} from 'react-string-format'
import {AuthContext} from '../App'
import {base_url} from '../ngrok_code'
const user = useContext(AuthContext).user
const{setUser} = useContext(AuthContext)
// Create a new Context object that will be provided to descendants of
// the AuthProvider.
const AuthMessage = React.createContext({
  message:""
});

export const signIn = async (email, password) => {
  const[message, set_message] = useState("")
  const url = base_url.concat(format('?email={0}&password={1}',email,password))
  axios.get(url).then((response)=>{
    if(response=="you've been successfully login in"){
      setUser(email)
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
      if (response == "added profile"){
        setUser(email)
      }
    });
  };

  // The signOut function calls the logOut function on the currently
  // logged in user
export const signOut = () => {
  const [message, set_message] = useState("");
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
  const[message, set_message] = useState("")
  const url = base_url.concat('/user/update')
  axios.post(url,{
    "email":user,
    "description":description,
    "picture":base64_image
  }).then((response)=>{
    set_message(response)
  });  
}
export {AuthMessage}; 
