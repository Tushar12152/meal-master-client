import {  createContext, useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../Config/firebase.config";
import axios from "axios";


export const AuthContext=createContext(null)

const AuthProvider = ({children}) => {

    const [loading,setLoading]=useState(true)
    const [user,setUser]=useState(null)
    const googleProvider=new GoogleAuthProvider


    const createUser=(email,password)=>{
         setLoading(true)
         return createUserWithEmailAndPassword(auth,email,password)
    }

    const SignIn=(email,password)=>{
        setLoading(true)
           return signInWithEmailAndPassword(auth,email,password)
    }

    const googlepopUp=()=>{
        setLoading(true)
         return signInWithPopup(auth,googleProvider)
    }


const logOut=()=>{
    setLoading(true)
    return signOut(auth)
}


    useEffect(()=>{
           const unsubscribe=onAuthStateChanged(auth,currentUser=>{
               setUser(currentUser)
            
               if(currentUser){
                const userInfo={email:currentUser?.email}
                axios.post('https://meal-master-server-three.vercel.app/jwt',userInfo)
                    .then(res=>{
                          if(res.data.token){
                              localStorage.setItem('access-token',res.data.token)
                          }
                    })
               }else{
                    localStorage.removeItem('access-token')
               }

               setLoading(false)
           })

           return ()=>{
               return unsubscribe()
           }
    },[])



    const authInfo={
        loading,
        user,
        createUser,
        SignIn,
        googlepopUp,
        logOut,


    }
    return (
        <AuthContext.Provider value={authInfo}>
              {children}
        </AuthContext.Provider>
    );
};



AuthProvider.propTypes={
     children:PropTypes.node,
}

export default AuthProvider;