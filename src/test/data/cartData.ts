import  CartItem  from "../../types/CartItems";
// import categoriesData from "./categoriesData";

export const cartData: CartItem[] = [
    {
        id: 1,
        title: "nuevo title",
        price: 987,
        category: {
            id:1,
            name:"clothes",
            image:"",
            creationAt:"",
            updatedAt:""
        },
        images: [],
        description: "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
        quantity: 1,
        isChecked:false,
        creationAt:"",
        updatedAt:"",
    },
    {
        id: 2,
        title: "Bespoke Wooden Shirt",
        price: 551,
        category:{
            id:1,
            name:"clothes",
            image:"",
            creationAt:"",
            updatedAt:""
        },
        images: [],
        description: "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
        quantity: 2,
        isChecked:true,
        creationAt:"",
        updatedAt:"",
    },
]