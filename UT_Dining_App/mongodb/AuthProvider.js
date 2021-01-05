import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { getRealmApp } from "../getRealmApp";

// Access the Realm App.
const app = useContext(getRealmApp());

// Create a new Context object that will be provided to descendants of
// the AuthProvider.
const AuthContext = React.createContext(null);

// The AuthProvider is responsible for user management and provides the
// AuthContext value to its descendants. Components under an AuthProvider can
// use the useAuth() hook to access the auth value.
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(app.currentUser);
  const realmRef = useRef(null);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    // The current user always has their own project, so we don't need
    // to wait for the user object to load before displaying that project.
    const myProject = { name: "My Project", partition: `project=${user.id}` };
    setProjectData([myProject]);

    const config = {
      sync: {
        user,
        partitionValue: `user=${user.id}`,
      },
    };

    // Open a realm with the logged in user's partition value in order
    // to get the projects that the logged in user is a member of
    Realm.open(config).then((userRealm) => {
      realmRef.current = userRealm;
      const users = userRealm.objects("User");

      users.addListener(() => {
        // The user custom data object may not have been loaded on
        // the server side yet when a user is first registered.
        if (users.length === 0) {
          setProjectData([myProject]);
        } else {
          const { memberOf } = users[0];
          setProjectData([...memberOf]);
        }
      });
    });
    // TODO: Open the user realm, which contains at most one user custom data object
    // for the logged-in user.

    // TODO: Return a cleanup function that closes the user realm.
    return () => {
        // cleanup function
        const userRealm = realmRef.current;
        if (userRealm) {
          userRealm.close();
          realmRef.current = null;
          setProjectData([]); // set project data to an empty array (this prevents the array from staying in state on logout)
        }
      };
  }, [user]);

  // The signIn function takes an email and password and uses the
  // emailPassword authentication provider to log in.
  const signIn = async (email, password) => {
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
  const signUp = async (email, password) => {
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
  const signOut = () => {
    if (user == null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    setUser(null);
  };
  const updateProfile = async(description, base64_image) =>{
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
  const get_nut = async(id) =>{
    const check = {
      "_id":user,
    }
    await app.collection.findOne(check).then(result=>{
      return result["nut_facts"]
    })
  }
  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        updateProfile,
        get_nut,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// The useAuth hook can be used by components under an AuthProvider to
// access the auth context value.
const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("useAuth() called outside of a AuthProvider?");
  }
  return auth;
};

export { AuthProvider, useAuth };
