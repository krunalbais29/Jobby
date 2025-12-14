import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FaStar,FaLocationDot } from "react-icons/fa6";
import { BsBriefcaseFill } from "react-icons/bs";
import './index.css';
import NavigationBar from '../navigation';

const JobsItemDetails = () => {

  const {id} = useParams();
  const token = Cookies.get("jwt_token");

  const [jobDetails,setJobDetails] = useState(null);
  const [skill,setSkill] = useState(null);
  const [life,setLife] = useState(null);
  const [similarJobs,setSimilarJobs] = useState(null);

  // console.log(useParams());

  

    const fetchJobsDetails = async() => {
      const api = `https://apis.ccbp.in/jobs/${id}`;

      const options = {
        method : "GET",
        headers : {
          Authorization : `Bearer ${token}`
        },
      };


      try {
        const response = await fetch(api,options);
        const data = await response.json();

        // console.log(data.job_details);
        // console.log(data.job_details.skills);
        // // console.log(data.life_at_company);
        setJobDetails(data.job_details);
        setSkill(data.job_details.skills);
        setLife(data.job_details.life_at_company);
        setSimilarJobs(data.similar_jobs);
        
      } catch (error) {
        console.log(error);
      }

    }

    useEffect(() => {
      fetchJobsDetails();
    });

    if (!jobDetails) {
    return <h3 className="text-center p-3">Loading...</h3>;
  }


  return (

    
    <div className="">
      <div className="w-100 sticky-nav"><NavigationBar/></div>
        
      <div className='row w-100'>


                <div className='col-lg-8'>

                  <div className=" job-card mx-3 card  w-100 border-0 p-3 mt-4 rounded-3">
                    <div className="d-flex align-items-center">
                      <img src={jobDetails.company_logo_url} alt="logo" width="60px" />
                      <div className="ms-3">
                          <h4 className="mb-1">{jobDetails.title}</h4>
                          <FaStar className="text-warning" />
                          <span className="ms-2">{jobDetails.rating}</span>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div>
                          <FaLocationDot /> <span className="me-3">{jobDetails.location}</span>
                          <BsBriefcaseFill /> <span>{jobDetails.employment_type}</span>
                      </div>
                      <h6 className="fw-bold">{jobDetails.package_per_annum}</h6>
                    </div>

                    <hr />

                    <div className='d-flex justify-content-between'>
                      <h6 className="fw-bold">Description</h6>
                      <Link to={jobDetails.company_website_url}>About</Link>
                    </div>
                    <p className="text-muted">{jobDetails.job_description}</p>

                    <br/>

                    
                    <h6 className="fw-bold">Skill</h6>

                    <div className='row d-flex bg-dark p-3 text-light m-2'>
                      {skill.map((e)=>(
                        <div className='col-md-2 d-flex m-2 ' key={e.name}>
                            <div className='d-flex align-items-center justify-content-center me-3'>
                              <img src={e.image_url} width='40' className='me-3'></img>
                              <h6 className='me-4'>{e.name}</h6>  
                            </div>    
                        </div>
                      ))}

                    </div>

                    <br/>

                    <h6 className="fw-bold">Life at company</h6>
                    <div className='row d-flex'>
                      <div className='col-md-6'>
                        <p >{life.description}</p>
                      </div>
                      <div className='col-md-6 mx-auto'>
                        <img src={life.image_url} className='mx-auto' width='90%' height='200px'></img>
                      </div>
                      

                    </div>

                    
                    




                </div>

            </div>
            
            {/* <hr className='mt-5'/> */}

            <div className='col-12 col-lg-4'>

              <h4 className='ms-4 mt-4'>Similar Jobs</h4>

              <div className="row p-3 mx-auto scroll">
                {similarJobs.map((e) => (
                    <div key={e.id} className="col-12 mb-4 " style={{cursor:'pointer'}}>
                      
                      <Link to={`../job/${e.id}`} style={{listStyle:'none',textDecoration:'none'}}>
                      
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




  )
}

export default JobsItemDetails;
