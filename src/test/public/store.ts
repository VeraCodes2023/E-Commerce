import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../../components/redux/reducers/productsSlice";
import usersReducer from "../../components/redux/reducers/usersSlice";
import cartReducer from "../../components/redux/reducers/cartSlice";

const store = configureStore({
    reducer: {
        productReducer,
        usersReducer,
        cartReducer,
    }
})

export default store