import React,{ useState,useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../redux/asyncThunk/userAsync';
import axios from 'axios';
import  {useAppSelector} from '../redux/hooks/useAppSelector';
import { useAppDisPatch }from '../redux/hooks/useAppDispatch';

const ProfileUpdate:React.FC = () => {
    const {error}=useAppSelector(state=>state.usersReducer)
    const redirect = useNavigate()
    const dispatch = useAppDisPatch()
    const [file, setFile] = useState<File | null>(null);
    const [img,setImg]=useState("")
    const [message,setMessage]=useState("")
   
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        avatar:img
    })
    useEffect(()=>{
        setUser({
            name:localStorage.getItem('name')?? '',
            email:localStorage.getItem('email')??'',
            password:localStorage.getItem('password')??'',
            avatar:localStorage.getItem('avatar')??''
        })

    },[])
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          setFile(e.target.files[0]);
        }
    };
    const handleUpload = useCallback(async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
              const response = await axios.post(
                'https://api.escuelajs.co/api/v1/files/upload',
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  }
                }
              );
              setImg(response.data.location)
            } catch (error) {
              console.error('Error:', error)
            }
        }
      }, [file]);

      useEffect(
        ()=>{
        handleUpload()
      },[handleUpload]
    )
    const handleInputChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value} = event.target;
        setUser({...user, [name]:value} )
    }

    const handleUpdateProfile= async (e:React.FormEvent)=>{
        e.preventDefault()
        const id = Number( localStorage.getItem('id') )
        const newInfo={
            name:user.name,
            email:user.email,
            password:user.password,
            avatar:user.avatar
        }
       await dispatch(updateUser({id,newInfo}))
       setMessage("profile has been updated successfully... wait page redirect")
       setUser({
        name:"",
        email:"",
        password:"",
        avatar:""
       })
       setTimeout(()=>{redirect('/profile')},2000)
      
    }


  return (
    <form id='createUser' onSubmit={e=>handleUpdateProfile(e)}>
        {message? <p className='reminder'>{message}</p>:null}
        {error? <p className='error'>{error}</p>:null}
        <div>
            <input type="text"  name='name'    placeholder='Name' value={user.name} onChange={handleInputChange} />
        </div>
        <div>
            <input type="email"  name='email'    placeholder='Email' value={user.email} onChange={handleInputChange} />
        </div>
        <div>
            <input type="password"  name='password'    placeholder='Password' value={user.password} onChange={handleInputChange} />
        </div>
        <div>
            <label htmlFor="input">Upload Profile Photo</label>
            <input type="file"  name="avatar" multiple  onChange={handleFileChange}  placeholder='avatar'/>
        </div>
        <button>Update Profile</button>
    </form>
  )
}

export default ProfileUpdate