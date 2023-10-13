interface Category{
    id:number,
    name:string,
    image:string,
    creationAt:string,
    updatedAt:string
}

interface ProductProps{
    id:number,
    title:string,
    price:number,
    description:string,
    images:string[],
    creationAt:string,
    updatedAt:string,
    category:Category
}


export default ProductProps