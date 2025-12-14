
import {Route,Routes, useNavigate} from 'react-router-dom'
import Cookie from 'js-cookie'
import { useEffect } from 'react';



const ProtectedRoute = (props) => {

   const {Component} = props;

   const navigate = useNavigate();

   const token = Cookie.get("jwt_token");

   useEffect(()=>{
      if(token === undefined){
         navigate("/login");
      }
   },[]);


   return (
      <Component/>
   )


}

export default ProtectedRoute;