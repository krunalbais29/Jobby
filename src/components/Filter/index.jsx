import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './index.css'



const empType = [
      {id: "FULLTIME", title : "Full Time"},
      {id: "PARTTIME", title : "Part Time"},
      {id: "INTERNSHIP", title : "Internship"},
      {id: "FREELANCE", title : "Freelance"}
   ]

   const salaryRange = [
      {id: 1000000, title : "10 LPA and above"},
      {id: 2000000, title : "20 LPA and above"},
      {id: 3000000, title : "30 LPA and above"},
      {id: 4000000, title : "40 LPA and above"}
   ];




const Filter = (props) => {


   const {onChangeEmpType,onChangeSalary} = props;

   const onChangeEmp = (e) => {
      onChangeEmpType(e.target.value,e.target.checked);
   }

   const onChangeSal = (e) => {
      onChangeSalary(e.target.value);  
   }

  return (
      <>
         <div className='row justify-content-evenly gap-2 p-3 '>

            <div className='col-md-5 p-3 rounded border border-secondary '>
               <h3>Type of Employment</h3>
               <br/>
                  {
                     empType.map((e)=> (
                        <div className='form-check d-flex gap-3' style={{fontSize:'20px'}} key={e.id}>
                           <input type="checkbox" className='form-check-input mb-3' onChange={onChangeEmp} value={e.id} id={e.id} />

                           <label className='form-check-label'  htmlFor={e.id}>{e.title}</label>

                        </div>

                     ))
                  }
            </div>


            <div className='col-md-5 p-3 rounded border border-secondary'>
               <h3>Salary Range</h3>
                  <br/>
                  {
                     salaryRange.map((e)=> (
                        <div className='form-check d-flex gap-3' style={{fontSize:'20px'}} key={e.id}>
                           <input type="radio" className='form-check-input mb-3' value={e.id} id={e.id} onChange={onChangeSal} name='range' />

                           <label className='form-check-label'  htmlFor={e.id}>{e.title}</label>

                        </div>

                     ))
                  }
            </div>


         </div>
      </>

      
      
  )
}

export default Filter;
