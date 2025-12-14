import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './index.css'

const Profile = () => {

   const[allValues, setValues] = useState([]);

   const profile = async() =>{

      const api = "https://apis.ccbp.in/profile";
      const token = Cookies.get("jwt_token")

      const options ={
         method : "GET",
         headers : {
            Authorization : `Bearer ${token}`
         }
      };

      try {

         const response = await fetch(api,options);
         const data = await response.json();

         setValues(data.profile_details);
         // console.log(data);
         
      } catch (error) {
         console.log(error);
      }      

   }

   useEffect( ()=> {
      profile();
   },[]);

  return (
    <div className=' profile-card bg-dark'>
         <img src={allValues.profile_image_url}></img>
         <h3 className='mt-3'>{allValues.name}</h3>
         <p>{allValues.short_bio}</p>
    </div>
  )
}

export default Profile;
