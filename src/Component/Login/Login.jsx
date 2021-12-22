import React, { useContext, useState } from 'react';
import firebaseConfig from './firebaseConfig'
import firebase from 'firebase';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import './Login.css'
import Facebook from '../../images/Facebook-logo.png'
import Google from '../../images/google.jpg'




if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}



function Login() {
  const [newUser, setNewUser] = useState(false)
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [isError,setError] = useState('')
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: ''
  })
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  
  const history = useHistory();
  const location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } };


  const handleGoogleSignIn = () => {

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
        setUserToken()
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

  const setUserToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      sessionStorage.setItem('token',idToken);
    }).catch(function(error) {
      // Handle error
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

  


  const handleChange = (event) => {
    //  console.log(event.target.name,event.target.value);
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);

    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      // setPassword(event.target?.value);
      // console.log('pass',password);
      isFieldValid = passwordHasNumber && isPasswordValid;
      setPassword(event.target.value);
    }
    if (event.target.name === 'confirmPassword') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      // setPassword(event.target?.value);
      // console.log('pass',password);
      isFieldValid = passwordHasNumber && isPasswordValid;
      setConfirmPassword(event.target.value);
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

  
    if(password !== confirmPassword){
      alert("confirm password should be match with password")
      }
      else{
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
              updateUserInfo(user.name, user.photo, user.email)
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
  
  }

  const updateUserInfo = (name, photo, email) => {
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
    <div>
    
      <div className="login">
        <form className="login-form" onSubmit={handleSubmit}>
          {
            !newUser ? <h3>Sign In</h3> : <h3>Create an account</h3>
          }
          {
            newUser && <input type="text" name="name" onBlur={handleChange} placeholder="Enter Your Name" />
          }

          <br />
          <input type="email" name="email" onBlur={handleChange} placeholder="Enter Your Email" /><br />
          <input type="password" name="password" onBlur={handleChange} placeholder="Enter your password" /><br />
          {
            newUser && <input type="password" name="confirmPassword" onBlur={handleChange} placeholder=" Confirm Your Password" />
          }
          <input type="submit" className=" mt-3 bg-primary text-light"  value={newUser ? 'Sign Up' : 'Sign In'} />
          {
            !newUser ? <p>Don't have an account?<span onClick={() => setNewUser(!newUser)} className="text-success">Sign Up Now</span></p> : <p>Already have an account?<span onClick={() => setNewUser(!newUser)} className="text-primary">Sign In</span></p>
          }
        </form>
        <p style={{ color: 'red' }}>{user.error}</p>
       
        {
          user.success && <p style={{ color: 'green' }}>User {newUser ? 'created ' : 'Logged In'}successfully</p>
        }
      </div>


      <div className="signIn_button ">
      
          <Button onClick={handleFacebookSignIn} variant="contained" >
            <span className="facebook_btn"><img src={Facebook} alt="" /></span> Continue with facebook</Button>
          <br />
       
        
          <Button onClick={handleGoogleSignIn} variant="contained"  >
            <span className="google_btn"><img src={Google} alt="" /></span> Continue with google</Button>
    

    

      </div>
    </div>



  );
}

export default Login;