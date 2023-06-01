import React,{useState,useEffect} from 'react'
import './Update.css'
import { useLocation } from 'react-router-dom'
import axios from '../../../axios'
import { useNavigate } from 'react-router-dom'

function Update() {
    const navigate = useNavigate()
    const location = useLocation()
    const {state}= location
    
    
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [id,setId] = useState('')
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('/admin/userUpdate',{email,name,phoneNumber,id}).then((response)=>{
            if(response.data.status) navigate('/admin/home')
        })

    }
    useEffect(()=>{
       
        axios.get(`/admin/userUpdate?id=${state.id}`).then((response)=>{
            if(response.status){
                const {name,email,phoneNumber,_id} = response.data.user
                setEmail(email)
                setName(name)
                setPhoneNumber(phoneNumber)
                setId(_id)
            }

        })
    },[])
  return (
    <div className='updateFormWrapper'>
        <form className='SignUpForm' onSubmit={handleSubmit}>
       
       <input
       className='SignUp-input'
       type='text' 
       placeholder='Enter your name'
       value={name}
       name="name"
       required
       onChange={(e)=>setName(e.target.value)}
       />
       <br />
       
       <input
       className='SignUp-input'
       type='email' 
       placeholder='Enter your mail'
       value={email}
       name="email"
       required
       onChange={(e)=>setEmail(e.target.value)}
       />
       <br />  
       <input
       className='SignUp-input'
       type='tel' 
       placeholder='Enter your Phone Number'
       value={phoneNumber}
       name="PhoneNumber"
       required
       onChange={(e)=>setPhoneNumber(e.target.value)}
       />
       <br />
       <button className='SignUp-btn' type='submit'>submit</button>
     </form>
    </div>
  )
}

export default Update
