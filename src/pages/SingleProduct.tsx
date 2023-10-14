import React,{useState, useEffect } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks/useAppSelector'; 
import { useAppDisPatch } from '../redux/hooks/useAppDispatch';
import  { getSingleProduct,resetProductsState } from '../redux/reducers/productsSlice';
import  ProductProps from '../types/product';
import { addToCart } from  '../redux/reducers/cartSlice';

const SingleProduct:React.FC = () => {

  const { singleProduct } = useAppSelector(state=>state.productReducer)
  const {productId}=useParams()
  const redirect = useNavigate()
  let pics = singleProduct.images
  const [selectedImage, setSelectedImage] = useState(pics[0]);
  const id = Number(productId)
  const dispatch = useAppDisPatch()

  useEffect(()=>{
     dispatch(getSingleProduct(id))
  },[id,dispatch])

  const onAddToCart = (event: React.MouseEvent<HTMLButtonElement>, payload:ProductProps)=> {
    event.preventDefault();
    if(singleProduct !== null){
      dispatch(addToCart(singleProduct))
    }
  }
  const handleClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div id='details'>
        <div className="left">
          <div className="top">
            {
             selectedImage === ""? 
             <img src={singleProduct?.category.image}  alt="" style={{width:310, height:280}}/>:
             <img src={selectedImage} alt=""  style={{width:310, height:280}}/>
            }
          </div>
          <div className="bottom">
            {
              singleProduct.images.map((image,index)=>(
              <img key={index} 
              alt=''
              style={{width:40, height:60}}
              onClick={() => handleClick(image)}
              src={image}/>))
            }
          </div>
        </div>
        <div className="right">
          <h2 className="title">{singleProduct?.title}</h2>
          <div className="price">{singleProduct?.price} Euros</div>
          <ul className="description">
              <p>Description:</p>
              <li>{singleProduct?.description}</li>
          </ul>
          <div>
            <button id='cartBtn' 
              onClick={(event)=>onAddToCart(event,singleProduct)}
              >
              Add to Cart
            </button>  
            <button id='cartBtn' 
              onClick={()=>{
                redirect('/',{replace:true})
                dispatch(resetProductsState())
              }}
              >
              Back Home
            </button>
          </div>    
        </div>
        
    </div>
  )
}

export default SingleProduct
