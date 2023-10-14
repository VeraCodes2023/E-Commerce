import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../../redux/reducers/productsSlice";
import usersReducer from "../../redux/reducers/usersSlice";
import cartReducer from "../../redux/reducers/cartSlice";

const store = configureStore({
    reducer: {
        productReducer,
        usersReducer,
        cartReducer,
    }
})

export default store