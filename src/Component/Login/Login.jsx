import React, { useContext, useState } from 'react';
import firebaseConfig from './firebaseConfig'
import firebase from 'firebase';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import {Button} from 'react-bootstrap'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }



function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: ''
  })
  const[loggedInUser,setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation()
  let {from} = location.state || { from: { pathname: "/" } };
  const handleSignIn = () => {

    const google_provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(google_provider)
      .then((res) => {

        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        }
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
       
        

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;

      });
  }

  const handleFacebookSignIn = () => {
    const facebook_provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(facebook_provider)
      .then((result) => {
        console.log(result.user);
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
       setLoggedInUser(signedInUser);
       history.replace(from);

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(error);

        // ...
      });
  }

  const handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      const signOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
      }
      setUser(signOutUser);
    }).catch((error) => {

    });
  }



  const handleChange = (event) => {
    //  console.log(event.target.name,event.target.value);
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);

    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = passwordHasNumber && isPasswordValid;
    }
    if (isFieldValid) {
      const newUser = { ...user };
      // console.log(newUser);
      newUser[event.target.name] = event.target.value;
      setUser(newUser)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newUser && user.email && user.password) {
      // console.log(user.email,user.password); 
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          // Signed in 
          const newUser = { ...user }
          newUser.error = '';
          newUser.success = true;
          setUser(newUser);
          //  console.log(res);
          updateUserInfo(user.name, user.photo,user.email)
        })
        .catch((error) => {
          const newUser = { ...user };
          newUser.error = error.message;
          newUser.success = false;
          setUser(newUser);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUser = { ...user }
          newUser.error = '';
          newUser.success = true;
          setUser(newUser);
          setLoggedInUser(newUser);
          const { displayName, email, photoURL } = res.user;
          console.log('hello', res.user);
          const signedInUser = {
            isSignedIn: true,
            name: displayName,
            email: email,
            photo: photoURL 
          }
          setUser(signedInUser);
       setLoggedInUser(signedInUser);
       history.replace(from);
        })
        .catch((error) => {
          const newUser = { ...user };
          newUser.error = error.message;
          newUser.success = false;
          setUser(newUser);
       
        });
    }
  }

  const updateUserInfo = (name, photo,email) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
      photoURL: photo,
      email: email
    })
      .then((res) => {
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div style={{textAlign: 'center'}}>
   
 
      {/* {
        user.isSignedIn && <div>
          <img src={user.photo} alt="" />
          <h2>Welcome,{user.name}</h2>
          <h4>Your email : {user.email}</h4>
        </div>
      }  */}




      <h1>Our Authentication</h1>
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
      <label htmlFor="newUser">Sign Up</label>

      <form onSubmit={handleSubmit}>
        {
          newUser && <input type="text" name="name" onBlur={handleChange} placeholder="Enter Your Name" />
        }
        <br />
        <input type="email" name="email" onBlur={handleChange} placeholder="Enter Your Email" /><br />
        <input type="password"  name="password" onBlur={handleChange} placeholder="Enter your password" /><br />
        <input type="submit" className="btn btn-primary mt-2" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ? 'created ' : 'Logged In'}successfully</p>
      }


      {/* {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign In With Google</button>
      } */}
      <Button onClick={handleSignIn} variant="success" className="mb-2">Sign In With Google</Button>
      <br/>

     <Button onClick={handleFacebookSignIn} variant="primary">Sign In With Facebook</Button>
    </div>



  );
}

export default Login;


// import React, { useState } from 'react';
// import { useContext } from 'react';
// import { UserContext } from '../../App';
// import { useHistory, useLocation } from 'react-router-dom';
// import { initializeLogin, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';



// function Login() {
//   const [newUser, setNewUser] = useState(false);
//   const [user, setUser] = useState({
//     isSignedIn: false,
//     name: '',
//     email: '',
//     password: '',
//     photo: ''
//   });
//   console.log(user);

//   initializeLogin();

//   const [loggedInUser, setLoggedInUser ] = useContext(UserContext);
//   const history = useHistory();
//   const location = useLocation();
//   let { from } = location.state || { from: { pathname: "/" } };

//   const googleSignIn = () => {
//       handleGoogleSignIn()
//       .then(res => {
//         handleResponse(res, true);
//       })
//   }

//   const fbSignIn = () => {
//       handleFbSignIn()
//       .then(res => {
//         handleResponse(res, true);
//       })

//   }

//   const signOut = () => {
//       handleSignOut()
//       .then(res => {
//           handleResponse(res, false);
//       })
//   }

//   const handleResponse = (res, redirect) =>{
//     setUser(res);
//     console.log('res',res);
//     setLoggedInUser(res);
//     if(redirect){
//         history.replace(from);
//     }
//   }

//   const handleBlur = (e) => {
//     let isFieldValid = true;
//     if(e.target.name === 'email'){
//       isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
//     }
//     if(e.target.name === 'password'){
//       const isPasswordValid = e.target.value.length > 6;
//       const passwordHasNumber =  /\d{1}/.test(e.target.value);
//       isFieldValid = isPasswordValid && passwordHasNumber;
//     }
//     if(isFieldValid){
//       const newUserInfo = {...user};
//       newUserInfo[e.target.name] = e.target.value;
//       setUser(newUserInfo);
//     }
//   }
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if(newUser && user.email && user.password){
//       createUserWithEmailAndPassword(user.name, user.email, user.password)
//       .then(res => {
//         handleResponse(res, true);
//       })
//     }

//     if(!newUser && user.email && user.password){
//       signInWithEmailAndPassword(user.email, user.password)
//       .then(res => {
//         handleResponse(res, true);
//       })
//     }
    
//   }

// console.log('user',user?.success);

//   return (
//     <div style={{textAlign: 'center'}}>
//       { user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
//         <button onClick={googleSignIn}>Sign In</button>
        
//       }
//       <br/>
//       <button onClick={fbSignIn}>Sign in using Facebook</button>
//       {
//         user?.isSignedIn && <div>
//           <p>Welcome, {user.name}!</p>
//           <p>Your email: {user.email}</p>
//           <img src={user.photo} alt=""/>
//         </div>
//       }

//       <h1>Our own Authentication</h1>
//       <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
//       <label htmlFor="newUser">New User Sign up</label>
//       <form onSubmit={handleSubmit}>
//         {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your name"/>}
//         <br/>
//         <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required/>
//         <br/>
//         <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required/>
//         <br/>
//         <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
//       </form>
//       <p style={{color: 'red'}}>{user.error}</p>
//       { user.success && <p style={{color: 'green'}}>User { newUser ? 'created' : 'Logged In'} successfully</p>}
//     </div>
//   );
// }

// export default Login;