import React, { useContext } from 'react';
import {Route, Redirect} from "react-router-dom";
import { UserContext } from './../../App';


function PrivateRoute({ component: Component, ...rest }) {
    const[loggedInUser,setLoggedInUser] = useContext(UserContext);
    return (
      <Route
        {...rest}
        render={props =>
          loggedInUser.name ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
  

export default PrivateRoute;