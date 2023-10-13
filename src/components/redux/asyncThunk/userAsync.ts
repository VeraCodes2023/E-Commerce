import {createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import UserProps from '../../types/user';
import UserListProps from '../../types/UserList';

import AddUserProps from '../../types/UserInput';
import UserLoginProps from '../../types/user'
import UserInputProps from '../../types/UserInput'
import User from '../../types/UserAuth';
import  UpdateProfileProps from '../../types/UpdateProfile';
const BASE_URL = "https://api.escuelajs.co/api/v1/auth";
const REGISTER="/refresh-token";


export const fetchUsersAsync = createAsyncThunk<UserListProps[], void, { rejectValue: string }>(
  'fetchUsersAsync',
  async (_, { rejectWithValue }) => {
      try {
          const result = await axios.get('https://api.escuelajs.co/api/v1/users')
          return result.data
      } catch (e) {
          const error = e as Error
          return rejectWithValue(error.message)
      }
  }
)


export const registerUser = createAsyncThunk(
    'registerUser',
    async ( newUser:UserInputProps ) => {
        try {
           const response = await axios.post("https://api.escuelajs.co/api/v1/users/", newUser)
           return response.data 
        } catch (AxiosError:any) {
             let error = AxiosError.response.data.message[0]+ AxiosError.response.data.message[1]
             return error
        }
    }
)

interface updateProfile{
  id:number,
  newInfo:UserInputProps
}


export const updateUser = createAsyncThunk<UserListProps, updateProfile>(
  'updateUser',
  async ({id,newInfo}, {rejectWithValue} ) => {
      try {
         const response = await axios.put<UserListProps>(`https://api.escuelajs.co/api/v1/users/${id}`, newInfo)
         return response.data 
      } catch (e) {
        const error = e as Error
        return rejectWithValue(error.message)
      }
  }
)

export const userProfileAsync =createAsyncThunk(
  'userProfileAsync',
  async(access_token:string)=>{
    try{
      const url = "https://api.escuelajs.co/api/v1/auth/profile";
      const headers ={
        Authorization: `Bearer ${access_token}`,
      }
      const response = await axios.get(url,{headers})
      return response.data
    }catch(err){
      throw err
    }
  }
)

export const authenticateUserAsync = createAsyncThunk<UserListProps, string, { rejectValue: string }>(
  "authenticateUserAsync",
  async (access_token, { rejectWithValue }) => {
      try {
          const getprofile = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
              headers: {
                  Authorization: `Bearer ${access_token}`
              }
          })
          return getprofile.data
      } catch (e) {
          const error = e as Error
          return rejectWithValue(error.message)
      }
  }
)

export const loginUserAsync = createAsyncThunk<UserListProps, User, { rejectValue: string }>(
  'loginUserAsync',
  async (cred, { rejectWithValue, dispatch }) => {
      try {
          const result = await axios.post('https://api.escuelajs.co/api/v1/auth/login', cred)
          const { access_token, refresh_token } = result.data
          const authenticatedResult = await dispatch(authenticateUserAsync(access_token))
          if (typeof authenticatedResult.payload === "string" || !authenticatedResult.payload) {
              throw Error(authenticatedResult.payload || "Cannot login")
          } else {
              localStorage.setItem("access_token", access_token)
              localStorage.setItem("refresh_token", refresh_token)
              return authenticatedResult.payload as UserListProps

          }
      }
      catch (e) {
          const error = e as Error
          return rejectWithValue(error.message)
      }
  }
)
