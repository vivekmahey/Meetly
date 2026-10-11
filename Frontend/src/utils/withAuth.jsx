import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const router = useNavigate();
        const isAuthenticated = () =>{
            if(localStorage.getItem('token')){
                return true;
            }
            return false;
        }

        useEffect(() => {
            if (!isAuthenticated()) {
                router('/auth');
            }
        },[])

        return <WrappedComponent {...props} />; 
        //... means all the props of the component will be passed to the wrapped component 
        // like if we have a component with props name and age then it will be passed to the wrapped component as props.name and props.age
    }

    return AuthComponent;
}

export default withAuth;