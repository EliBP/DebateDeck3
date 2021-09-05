import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  //set up the state with an empty current user & update function
  const [currentUser, setCurrentUser] = useState();

  //function to add a user to firebase database (doesn't update website)
  const signup = (firstName, lastName, email, password) => {
    return auth.createUser({
      email,
      password,
      displayName: firstName + lastName
    });
  };

  //method to notify website that auth state has changed
  //It is inside of useEffect because that makes sure that it only runs once, not every single render
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe; //This will unsubscribe from the onAuthChanged listener when the signup component unmounts
  }, []);

  //the auth information that will be accessable throughout the application
  const value = {
    currentUser,
    signup
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
