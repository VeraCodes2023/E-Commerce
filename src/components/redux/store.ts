import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productsSlice";
import usersReducer from "./reducers/usersSlice";
import cartReducer from "./reducers/cartSlice";
import CartItem from "../types/CartItems";
import  UserLoginProps from '../types/user';
import UserListProps from '../types/UserList'

let preCartReducer: CartItem[]=JSON.parse(localStorage.getItem('cart') || '[]')
let  preUserReducer = JSON.parse(localStorage.getItem('user') || '{}');
if (!Array.isArray(preCartReducer)) {
    localStorage.setItem('cart', '[]');
    preCartReducer =[];
}


const store = configureStore({
    reducer: {
        productReducer,
        usersReducer,
        cartReducer,
    },
   preloadedState:{
        cartReducer :preCartReducer,
        usersReducer : preUserReducer
    
   }
})

const updateLocalStorage =()=>{
    const cart = store.getState().cartReducer
    localStorage.setItem('cart', JSON.stringify(cart))
    const user = store.getState().usersReducer
    localStorage.setItem('user',JSON.stringify(user) )
}

store.subscribe(updateLocalStorage)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store