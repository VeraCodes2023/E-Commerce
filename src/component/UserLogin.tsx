import React,{useState,useEffect} from 'react';
import { TextField, Button } from '@mui/material';
import UserListProps from '../types/UserList';
import { Link,useNavigate } from 'react-router-dom';
import  {useAppDisPatch} from '../redux/hooks/useAppDispatch';
import  {useAppSelector} from '../redux/hooks/useAppSelector';
import  {authenticateUserAsync,loginUserAsync} from '../redux/asyncThunk/userAsync'

const UserLogin:React.FC = () => {
    const access_token = localStorage.getItem("access_token");
    const {error,loginUser}=useAppSelector(state=>state.usersReducer)
    const dispatch = useAppDisPatch()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [message,setMessage]=useState("")
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate()

    const validateForm = () => {
        const isValid = email.length >5 && password.length > 4;
        setIsFormValid(isValid);
      };

    useEffect(()=>{
        if(loginUser !==undefined && loginUser !==null){
            if(loginUser.role ==="customer"){
                setEmail("");
                setPassword("");
                setMessage("Login successfully, wait a second to redirect...");
                setTimeout(() => {
                  navigate('/profile');
                }, 2000);
            }else if(loginUser.role ==="admin"){
                setEmail("")
                setPassword("")
                setMessage("login successfully, wait a second to redirect...")
                setTimeout(()=>{navigate('/admin')},2000)
            }
        }else{
            return
        }
    },[loginUser,navigate])

   
    const loginHandler = async (e:React.FormEvent)=>{
        e.preventDefault()
        try{
            await dispatch(loginUserAsync({
                email:email,
                password:password,
                }))  
         }catch(err:any){  

             console.log(err)
        }
   }


  return (
    <div id="formWrapper">
        <div>
            <h2>User Login</h2>
        </div>
        <form  id='userLoginForm'  onSubmit={e=>loginHandler(e)}>
            {message? <p className='reminder'>{message}</p>:null}
            {error? <p className='error'>{error}</p>:null}
            <div>
                <input type="email"  value={email}  onChange={e=>{
                    setEmail(e.target.value)
                    validateForm()
                    }}placeholder='Email'/>
            </div>
            <div>
                <input type="password" value={password}  onChange={e=>{
                    setPassword(e.target.value)
                    validateForm()
                    }}  placeholder='Password'/>
            </div>
            <button>Login</button>
            <div>
                <p>Don't have an account yet ? 
                    <Link to='/register'>Register</Link>
                </p>
            </div>
        </form>
    </div>
  )
}

export default UserLogin

