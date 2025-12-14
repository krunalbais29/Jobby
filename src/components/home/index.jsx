import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import './index.css'
import NavigationBar from '../navigation'
import logo from '../../assets/logo.png'
import Footer from '../footer'

const Home = () => {
  const navigate = useNavigate()
  const token = Cookies.get('jwt_token')

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  return (
    <>
      <div className="d-flex flex-column w-100 h-100">
        <div className="w-100 sticky-nav">
          <NavigationBar />
        </div>

        <div className="hero w-100 mx-auto text-center ">
          <h1>Find Your Dream Job with Jobby</h1>
          <p>
            Explore thousands of job opportunities and build your career path.
          </p>
          <br/>
          <Link to="/job" className="btn-explore mt-5" style={{textDecoration:"none"}}>
            Explore Jobs
          </Link>
        </div>

     
        <div className="container d-flex mx-2 mt-4 mb-4">
          <div className="row w-100 d-flex gap-2 justify-content-evenly">
            <div className="col-lg-2 col-12">
              {/* <h3>Job Categories</h3> */}
            </div>
            {[
              { title: 'Internship', icon: 'fa-solid fa-graduation-cap' },
              { title: 'Full Time', icon: 'fa-solid fa-briefcase' },
              { title: 'Part Time', icon: 'fa-solid fa-clock' },
              { title: 'Freelance', icon: 'fa-solid fa-laptop-code' },
            ].map((job, index) => (
              <div key={index} className="col-lg-2 col-12 d-flex align-items-center gap-3 border rounded-3 p-2">
                <i className={job.icon}></i>
                <h5 className="text-center">{job.title}</h5>
              </div>
            ))}
          </div>
        </div>




        <Footer/>
      </div>
    </>
  )
}

export default Home
