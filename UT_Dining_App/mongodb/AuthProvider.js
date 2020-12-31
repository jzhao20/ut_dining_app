import React, {useContext, useState, useEffect, useRef} from "react";
import Realm from "realm";
import {getRealmApp} from "../getRealmApp";

const app =getRealmApp();
const AuthContext = React.createContext(null);

const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(app.currentUser);
    const realmRef = useRef(null);
    const [projectData, setProjectData] = useState([])

    useEffect(()=>{
        if (!user){
            return;
        }
    })
}