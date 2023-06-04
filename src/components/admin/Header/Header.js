import React from 'react'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate()
  const handleLogout = ()=>{
    console.log('hello');
    const expires = "expires=" + 'Thu, 01 Jan 1970 00:00:01 GMT'
    document.cookie ="token=Bearer "+";" + expires + "; path=/";
    document.cookie = "admintoken=Bearer "+ ';' + expires +";"+"path=/admin/home"
    navigate('/admin/login')
  }
  return (
    <div className='navbar'>
      <div>
        <h2>Dash Board</h2>  
      </div>    
      <div>
        <h3 onClick={handleLogout}>Logout</h3>
      </div>  
      
    </div>
  )
}

export default Header
