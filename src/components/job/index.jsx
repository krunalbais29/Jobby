import { useState,useEffect } from "react";
import Cookies from 'js-cookie'
import NavigationBar from '../navigation'
import Filter from "../Filter";
import { FaStar,FaLocationDot } from "react-icons/fa6";
import { BsBriefcaseFill } from "react-icons/bs";
import './index.css';
import { Link } from "react-router-dom";



const Job = () => {

   const [allValues,setValues] = useState([]);
   const [searchJob,setSearchJOb] = useState({
      empType : [],
      minPackage : 0,
      userInput : ""
   });

   const getJobs = async () => {

      const {empType,minPackage,userInput} = searchJob;

      // console.log(empType);
      // console.log(minPackage);

      const api = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${minPackage}&search=${userInput}`;
      const token = Cookies.get("jwt_token");

      // console.log(token);

      const options = {
      method: "GET",
      headers: {
         Authorization: `Bearer ${token}`
      }
      };

      try {
      const response = await fetch(api, options);
      const data = await response.json();
      // console.log(data.jobs);
      setValues(data.jobs);
      } catch (error) {
      console.log(error);
      }



      
   };

   useEffect(() => {
      getJobs();
   },[searchJob.userInput,searchJob.empType,searchJob.minPackage]);

   
   const onSearchJobs = (e) => {
      
      if(e.key === "Enter"){
      setSearchJOb({...searchJob,userInput : e.target.value});
      }

   }

   const onChangeEmpType = (e,isChecked) => {
      // console.log("function executed!!!",e,isChecked);

      if(isChecked){
         setSearchJOb({...searchJob,empType:[...searchJob.empType,e]});
      }
      else{
         setSearchJOb({...searchJob,empType : searchJob.empType.filter(value=> value !== e)});
      }
   }   



   return(
      <>
         <div className ="d-flex flex-column w-100">

            <div className="w-100 sticky-nav "><NavigationBar/></div>


            <div className="container-fluid  w-100 " >
               <div>


                  <div>

                     <div className="d-flex w-100 gap-1 " style={{paddingLeft : "30px"}}>
                        <input type="text" className="form-control my-4 p-2 " onKeyUp={onSearchJobs} placeholder="search your dream jobs here..." />
                        <button className="btn-explore1 my-4" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" >Filter</button>
                     </div>
                     

                     <div className="row w-100 justify-content-center collapse" id="collapseExample">
                        <Filter onChangeEmpType = {onChangeEmpType} onChangeSalary = {(salary) => setSearchJOb({...searchJob,minPackage:salary})} />
                     </div>

                     <div className="row p-3">
                        {allValues.map((e) => (
                           <div key={e.id} className="col-md-6 col-lg-4 mb-4 " style={{cursor:'pointer'}}>
                              
                              <Link to={`/job/${e.id}`} style={{listStyle:'none',textDecoration:'none'}}>
                              
                                    <div className=" job-card card h-100 border-0 p-3 rounded-3">
                                       <div className="d-flex align-items-center">
                                          <img src={e.company_logo_url} alt="logo" width="60px" />
                                          <div className="ms-3">
                                             <h5 className="mb-1">{e.title}</h5>
                                             <FaStar className="text-warning" />
                                             <span className="ms-2">{e.rating}</span>
                                          </div>
                                       </div>

                                       <div className="d-flex justify-content-between align-items-center mt-3">
                                          <div>
                                             <FaLocationDot /> <span className="me-3">{e.location}</span>
                                             <BsBriefcaseFill /> <span>{e.employment_type}</span>
                                          </div>
                                          <h6 className="fw-bold">{e.package_per_annum}</h6>
                                       </div>

                                       <hr />

                                       <h6 className="fw-bold">Description</h6>
                                       <p className="text-muted">{e.job_description}</p>
                                    </div>

                              </Link>
                              
                           </div>
                        ))}
                     </div>
                  </div>

               </div>
            </div>
            
         </div>
      </>
   )
}

export default Job;