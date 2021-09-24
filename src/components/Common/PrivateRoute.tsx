import * as React from 'react';
import {Redirect, RouteProps, Route} from 'react-router-dom';
export interface PrivateRouteProps {
}

export function PrivateRoute (props: RouteProps) {
//check if user is logged in
// If yes, show route
//Otherwise, redirect login page

const isLoggedIn = Boolean(localStorage.getItem('access_token'))
console.log('Is logged in', isLoggedIn);
if(!isLoggedIn) return <Redirect to='/login' />;
return <Route {...props}/>
}
