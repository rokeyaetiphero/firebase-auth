import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

function App() {
  const [user,setUser] = useState({
    isSignedIn : false,
    name : '',
    email: '',
    photo:'',
  })

  const provider = new firebase.auth.GoogleAuthProvider();
   
  const handleSignin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(res =>{
      const {displayName,photoURL,email} = res.user;
      const signedInUser = {
          isSignedInUser : true,
          name: displayName,
          email: email,
          photo: photoURL,
      }
      setUser(signedInUser);
    })
    .catch(err =>{
       console.log(err)
       console.log(err.message)
      });
  }

  const handleSignOut = () =>{
    firebase.auth().signOut()//call kora holo signout k documentation dekhe
    .then(res=>{//jdi ei response orthat signOut ta success hy thle body te dhuke return krbe
      const signedOutUser = {//jhtu signout tai user r kno info thkbe na ,,,shob empty hbe tai
        isSignedIn : false,
        name: '',
        photo: '',
        email: '',
      }
      setUser(signedOutUser);//empty user pass kora holo
    })

    .catch(err => {
      
    })
  }
//user jdi already signed in thake thle ? er por statement ti run krbe orthat signout dekhabe..r condition opposite hle sign in krbe
//trpor signed in hye 64 num line thke execute krte strt krbe
return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={handleSignin}>Sign In</button>
      }
      {
        user.isSignedIn = true && <div>
          <h1>Welcome: {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <img src={user.photo} alt=""/>
          </div>
      }
    </div>
  );
}

export default App;
