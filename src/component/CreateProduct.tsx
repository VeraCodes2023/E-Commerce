import React,{ useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAppDisPatch } from '../redux/hooks/useAppDispatch';
import { addProduct } from '../redux/asyncThunk/productsAsync';
import ProductInput from '../types/ProductInput';
import { useNavigate } from 'react-router-dom';
import  {useAppSelector} from '../redux/hooks/useAppSelector';

const CreateProduct:React.FC = () => {
    const {error}=useAppSelector(state=>state.productReducer)
    const [message,setMessage]=useState("")
    const [file, setFile] = useState<File | null>(null);
    const [img,setImg]=useState([""])
    const dispatch =useAppDisPatch()
    const redirect= useNavigate()

    const [product,setProduct]=useState({
        title:"",
        price:0,
        description:"",
        categoryId:0,
        images:[""]
    })
    const handleInputChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
      const { name, value} = event.target;
      setProduct({...product, [name]:value} )
   }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          setFile(e.target.files[0]);
        }
    };
   
    const handleUpload = useCallback(async () => {
      if (file) {
          const formData = new FormData();
          formData.append('file', file);
          try {
            const response = await axios.post(
              'https://api.escuelajs.co/api/v1/files/upload',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
              }
            );
            setImg(response.data.location)
          } catch (error) {
            console.error('Error:', error)
          }
      }
    }, [file]);

    useEffect(
        ()=>{
        handleUpload()
      },[handleUpload]
    )

    const handleSubmit= async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const newProduct:ProductInput={
            title:product.title,
            price:product.price,
            description:product.description,
            images:[img.toString()],
            categoryId:product.categoryId
        }
        await  dispatch(addProduct(newProduct))
        setMessage("Product has been added successfully... wait for page redirect")
        setProduct({
            title:"",
            price:0,
            description:"",
            categoryId:1,
            images:[""]
        })
       redirect('/admin', {replace:true})  
    }

  return (
    <form id='newProductForm'  onSubmit={e=>handleSubmit(e)}>
         {message? <p className='reminder'>{message}</p>:null}
         {error? <p className='error'>{error}</p>:null}
        <div>
            <label htmlFor="">Product Title</label>
            <input type="text" name='title' value={product.title}   placeholder='Product Title'  onChange={handleInputChange}/>
        </div>
        <div>
            <label htmlFor="">Product Price</label>
            <input type="number" name='price' placeholder='Price' value={product.price} onChange={handleInputChange}/>
        </div>
        <div>
            <label htmlFor="">Product Description</label>
            <input type="text"  name='description'  placeholder='Description' value={product.description} onChange={handleInputChange}/>
        </div>
        <div>
            <label htmlFor="">Product Category ID</label>
            <input type="number" name='categoryId' placeholder='Category ID' value={product.categoryId} onChange={handleInputChange}/>
        </div>
        <div>
            <label htmlFor="">Product Images</label>
            <input type="file" name="imgInput" multiple  onChange={handleFileChange}/>
        </div>
        <button>Create Product</button>
    </form>
)
}

export default CreateProduct