

import React, { useState } from "react";

import {
 
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
//   FacebookAuthProvider,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../Pages/Firebase_config";
import { useEffect } from "react";
// import axios from "axios";


export const AuthContext = React.createContext();
export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [userName,setUserName] = useState('')
    const [user_Auth,set_Auth]=useState({
      user_Auth:false,
      token:null
    });
    const userLogin=(token)=>{
      set_Auth({user_Auth:true,token:token});
  
    }
    function logOut() {
      setUserName('')
      return signOut(auth);
    }
   
    
  
    function googleSignIn() {
      const googleAuthProvider = new GoogleAuthProvider();
      return signInWithPopup(auth, googleAuthProvider);
    }
  
    // function facebookSignIn() {
    //   const provider = new FacebookAuthProvider();
    //   return signInWithPopup(auth, provider);
    // }
    
  
  
   console.log("user_Auth",user_Auth)
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
  
    // console.log("user",user)
  
  
    return (
      <AuthContext.Provider
        value={{ user, logOut, googleSignIn,user_Auth,userLogin,setUserName,userName}}
      >
        {children}
      </AuthContext.Provider>
    );
  }