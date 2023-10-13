interface Category{
    id:number,
    name:string,
    image:string,
    creationAt:string,
    updatedAt:string
}


interface CartItem{
    id:number,
    title:string,
    price:number,
    description:string,
    images:string[],
    creationAt:string,
    updatedAt:string,
    category:Category
    quantity:number,
    isChecked:boolean,
}



export default CartItem