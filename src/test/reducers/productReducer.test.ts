import {fetchAllProducts,addProduct,deleteProduct,updateProduct} from "../../redux/asyncThunk/productsAsync";
import {setUpState,sortProductsbyPrice}from "../../redux/reducers/productsSlice"
import { productsData } from "../data/productsData"
import server from "../public/productServer"
import store from "../public/store"
import ProductInput from "../../types/ProductInput";
import updateProductProps from "../../types/updatedProduct"
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(axios);
jest.mock('axios');


beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

 describe("Test normal actions in productsReducer", () => {
        test("Should return initial state", () => {
            expect(store.getState().productReducer.products).toMatchObject([])
        })

       test("Should sort the products by price asc", ()=>{
        store.dispatch(setUpState(productsData))
        store.dispatch(sortProductsbyPrice("asc"))
        const products = store.getState().productReducer.products
        expect(products[0]).toBe(productsData[3])
    })

    test("Should sort products by price desc", () => {
        store.dispatch(setUpState(productsData))
        store.dispatch(sortProductsbyPrice("desc"))
        const products = store.getState().productReducer.products
        expect(products[0]).toBe(productsData[11])
    })
 
 
})

describe("Test async thunk actions in productsReducer", () => {
    
    test("Should fetch all products with pagination", async () => {
        await store.dispatch(fetchAllProducts({ limit:12, offset: 0 }))
        const fetchedProductsList = store.getState().productReducer.products;
        console.log(fetchedProductsList.length)
        expect(fetchedProductsList.length).toBe(12)
    });
   

    test("Should delete an existduct", async () => {
        const resultAction = await store.dispatch(deleteProduct(10))
        expect(resultAction.meta.requestStatus).toBe("fulfilled")
    })
    test("Should delete an non-existing product", async () => {
        const resultAction = await store.dispatch(deleteProduct(1))
        expect(resultAction.meta.requestStatus).toBe("fulfilled")
    })
   
    test("should create new Product", async () => {
      const input: ProductInput ={
        title: "test product",
        description: "test product",
        price: 100,
        categoryId: 3,
        images: ["https://i.imgur.com/O1LUkwy.jpeg"],
      };
      const resultAction = await store.dispatch(addProduct(input));
      console.log(resultAction)
      expect(resultAction.meta.requestStatus).toBe("fulfilled");
    })

    // test("Should update product", async () => {
    //     const input: updateProductProps = {
    //       id: 19,
    //       updatedProduct: {
    //         id:19,
    //         title: "Newly updated product",
    //         price: 200,
    //         // categoryId:4,
    //         category:{
    //           id: 4,
    //           name: "Shoes",
    //           image: "https://i.imgur.com/DumuKkD.jpeg",
    //           creationAt: "2023-10-10T03:04:13.000Z",
    //           updatedAt: "2023-10-10T03:04:13.000Z"
    //         },
    //         description: "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design. Guess you should buy it!",
    //         images:["https://i.imgur.com/DumuKkD.jpeg"],
    //         creationAt: "2023-10-10T03:04:13.000Z",
    //         updatedAt: "2023-10-10T11:26:54.000Z",
                 
    //       }
    //     };
    //     const action = await store.dispatch(updateProduct(input));
    //     const priceValue = action.payload as { price: number };
    //     console.log(action)
    //   });


})
