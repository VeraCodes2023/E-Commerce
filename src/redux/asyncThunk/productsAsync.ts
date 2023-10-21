import {createAsyncThunk } from "@reduxjs/toolkit";
import ProductProps from "../../types/product";
import ProductInput from "../../types/ProductInput";
import updateProductProps from '../../types/updatedProduct'
import PaginationQuery from "../../types/PaginationQery";
import axios from "axios";
const apiUrl = "https://api.escuelajs.co/api/v1/products";


export const fetchAllProducts = createAsyncThunk(
    'fetchAllProductsAsync',
    async ({  offset, limit }: PaginationQuery) => {
        try {
           const response = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
           return response.data as ProductProps[]
        } catch (e) {
            const error = e as Error
            return error
        }
    }
)

export const fetchCategoryProducts = createAsyncThunk(
    'fetchCategoryProductsAsync',
    async () => {
        try {
           const response = await axios.get("https://api.escuelajs.co/api/v1/categories/")
           return response.data as ProductProps[]
        } catch (e) {
            const error = e as Error
            return error
        }
    }
)


export const fetchSingleAsync = createAsyncThunk(
    "fetchSingleAsync",
    async (id: number, { rejectWithValue }) => {
      try {
        const { data } = await axios.get<ProductProps>(`/products/${id}`);
        return data;
      } catch (e) {
        return rejectWithValue(e);
      }
    }
);



export const addProduct = createAsyncThunk(
    'addProduct',
    async(newProduct: ProductInput) => {
    
        try {
            const response = await axios.post(apiUrl, newProduct)
            return response.data as ProductProps
            
        } catch (e) {
            const error = e as Error
            return error
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'deleteProduct',
    async(id:number)=>{
        try{
           const response = await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`)
           return response.data
        }catch(err){
            return err
        }
    }
)

export const updateProduct = createAsyncThunk(
    'updateProduct',
    async( {id,updatedProduct}:updateProductProps, {rejectWithValue}  )=>{
        try {
            const response = await axios.put <ProductProps>(`https://api.escuelajs.co/api/v1/products/${id}`, updatedProduct)
            return response.data 
            
        } catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)

