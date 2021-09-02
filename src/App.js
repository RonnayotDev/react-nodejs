import Axios from 'axios'
import { useState } from 'react'
import './App.css';

const App = () =>  {
const [name,setName] = useState("")
const [age,setAge] = useState(0)
const [country,setCountry] = useState("")
const [position,setPosition] = useState("")
const [money,setMoney] = useState(0)
const [employeeList , setEmployeeList] = useState([])
const [newmoney , setNewMoney] = useState(0);

const handleName = (e) =>{
  setName(e.target.value);
}
const handleAge = (e) =>{
  setAge(e.target.value);
}
const handleCountry = (e) =>{
  setCountry(e.target.value);
}
const handlePosition = (e) =>{
  setPosition(e.target.value);
}
const handleMoney = (e) =>{
  setMoney(e.target.value);
}
const handlenewmoney = (e) =>{
  setNewMoney(e.target.value)
}



const getEmployees = () =>{
  Axios.get("http://localhost:3002/employees").then((respond) => {
    setEmployeeList(respond.data);
  })
}

const addEmployee = () => {
  Axios.post("http://localhost:3002/create",{
    name:name,
    age:age,
    country:country,
    position: position,
    money:money
  
}).then(() => {
  setEmployeeList(
    [
      {
        name:name,
        age:age,
        country:country,
        position:position,
        money:money
      },...employeeList]
  )
  
})
}
const updateEmployeeMoney = (id) =>{
  Axios.put("http://localhost:3002/update"
   ,
   {money : newmoney , id: id}
   ).then((respond) => {
    setEmployeeList(
      employeeList.map((val) => {
        return val.id === id ? {
          id: val.id,
          name: val.name,
          country: val.country,
          age: val.age,
          position: position,
          money:money
        } : val;
      })
    )
      
    
  })
}
const deleteEmployeeMoney = (id) =>{
  Axios.delete(`http://localhost:3002/delete/${id}`).then((respond) =>{
    setEmployeeList(
      employeeList.filter((val) => {
        return val.id !== id
      })
    )
  })
}

  return (
    <div className="App container mt-5">
      <div class="row">
     <h1>Employee Information</h1>
     <div className="information">
       <form action="">
         <div className="mb-3">
           <label htmlFor="name" className="form-label">
             Name:
           </label>
           <input 
           type="text"
           className="form-control"
           placeholder="Enter Your Name"
           onChange={handleName}
           />
           
         </div>
         <div className="mb-3">
           <label htmlFor="age" className="form-label">
             Age:
           </label>
           <input 
           type="number"
           className="form-control"
           placeholder="Enter Your Age"
           onChange={handleAge}
           />
           
         </div>
         <div className="mb-3">
           <label htmlFor="Country" className="form-label">
             Country:
           </label>
           <input 
           type="text"
           className="form-control"
           placeholder="Enter Your Country"
           onChange={handleCountry}
           />
           
         </div>
         <div className="mb-3">
           <label htmlFor="Position" className="form-label">
             Position:
           </label>
           <input 
           type="text"
           className="form-control"
           placeholder="Enter Your Position"
           onChange={handlePosition}
           />
           
         </div>
         <div className="mb-3">
           <label htmlFor="money" className="form-label">
             Money:
           </label>
           <input 
           type="number"
           className="form-control"
           placeholder="Enter Your Money"
           onChange={handleMoney}
           />
           
         </div>
         <button onClick={addEmployee} className="btn btn-success mb-3">
           Add Employee
         </button>
       </form>
     </div>
     <hr/>
     <div className="employees">
       <button onClick={getEmployees} className="btn btn-primary mb-5">
         Show employees
       </button>

       {employeeList.map((val,key) => {
         return (
           <div className="employee card mt-3">
             <div className="card-body text-left">
               <p className="card-text">
                 <strong>Name</strong>: {val.name}
               </p>
               <p className="card-text">
               <strong>Age</strong>: {val.age}
               </p>
               <p className="card-text">
                 <strong>Country</strong>: {val.country}
               </p>
               <p className="card-text">
                 <strong>Position</strong>: {val.position}
               </p>
               <p className="card-text">
                 <strong>Money</strong>: {val.money}
               </p>
               <div className="d-flex justify-content-center">
                 <input onChange = {handlenewmoney}type="number" placeholder="15000....." className="form-control" style={{width:"300px"}}/>
                <button onClick = {() => {
                  updateEmployeeMoney(val.id)
                }} className="btn btn-warning mx-3">
                  Update
                </button>
                <button onClick = {() => {
                  deleteEmployeeMoney(val.id)
                }}className="btn btn-danger">
                  Delete
                </button>
               </div>
             </div>
           </div>
         )
       })}
     </div>
     </div>
    </div>
  );
}
export default App;



