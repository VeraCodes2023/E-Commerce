import React,{useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {faTruck} from '@fortawesome/free-solid-svg-icons'
import {faPhone} from '@fortawesome/free-solid-svg-icons'
import {userProfileAsync,authenticateUserAsync,loginUserAsync} from '../redux/asyncThunk/userAsync';
import  { useAppSelector } from '../redux/hooks/useAppSelector';
import UserListProps from '../types/UserList';
import {useAppDisPatch} from '../redux/hooks/useAppDispatch'

const UserProfilePage:React.FC =()=>{
  const dispatch = useAppDisPatch()
  const redirect = useNavigate()
  // const {access_token,} = useAppSelector(state=>state.authReducer)
  const [currentUser, setCurrentUser]=useState<UserListProps>()
  const {loginUser} = useAppSelector(state=>state.usersReducer)

  const handleUpdateUser=()=>{
      if(loginUser){
        localStorage.setItem('id',loginUser.id.toString())
        localStorage.setItem('name',loginUser.name)
        localStorage.setItem('email',loginUser.email)
        localStorage.setItem('password', loginUser.password)
        localStorage.setItem('avatar', loginUser.avatar)
      }
   
      redirect('/profileUpdate',{replace:true})
  }

  console.log(loginUser)
  return(<div id="profile">
      <div>
          <img src={loginUser?.avatar} alt="pic" />
          <h2> {loginUser && loginUser.name} </h2>
          <div>
            <a href="##">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
            <p>{loginUser && loginUser.email}</p>
          </div>
          <div>
            <a href="##">
              <FontAwesomeIcon icon={faPhone} />
            </a>
            <p>044 985 7318</p>
          </div>
          <div>
            <a href="##">
              <FontAwesomeIcon icon={faTruck} />
            </a>
            <p>Koskikatu 23,2240,ESPOO,Finland</p>
          </div>
          <button onClick={()=>handleUpdateUser()}>Update</button>
      </div>
     
  </div>)
}


export default UserProfilePage