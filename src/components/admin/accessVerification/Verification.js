import getCookies from "../../../helpers/getCookies";
import api from '../../../adminAxios'
import { useSelector,useDispatch } from "react-redux";
import { userActions } from "../../../redux/userAuthentification";
import { useNavigate } from "react-router-dom";


const AdminVerification=({children,accessBy})=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((store)=>store.user.userName)
    if(accessBy === "Authorised"){
        const cookie = getCookies()
        console.log(cookie);
        if(user ){
            return children
        }else if(cookie && cookie['admintoken']){
            api.get('/tokenVerification').then((res)=>{
                if(res.data.status){
                    
                    dispatch(userActions.userLogin({name:res.data.name}))
                    return children
                }else{
                    window.location.href = '/admin/login'
                }
            } ).catch((error)=>console.log(error.message)) 
        }
        else{
            window.location.href = '/admin/login'
        }
    }

}

export default AdminVerification