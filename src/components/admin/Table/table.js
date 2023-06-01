import React,{useState,useEffect} from "react";
import Table from "react-bootstrap/Table";
import Update from '../../../assets/updateIcon'
import Delete from '../../../assets/Delete'
import axios from '../../../axios'
import { useNavigate } from "react-router-dom";

function AdminTable(props) {
  const navigate = useNavigate()
  const [deleteState,setDeleteUser] = useState(false)
  const [users,setUsers] = useState([])
    const update=(id)=>{
       navigate('/admin/userUpdate',{state:{id}})
      
    }
    const deleteUser = (id)=>{
     axios.post('/admin/delete',{id}).then(response=>{
      if(response.data.status){
        if(!deleteState)  setDeleteUser(true)
        else setDeleteUser(false)
      }
     })
    }
    useEffect(()=>{
      axios.get('/admin/home').then((users)=>{
        setUsers(users.data.users);
       }).catch((error)=>{console.log(error.messafe);})
    },[deleteState])
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users
            ? users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td onClick={()=> update(user._id)} > <Update /></td>
                    <td onClick={()=> deleteUser(user._id) }><Delete  /></td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminTable;
