import AdminDashBoard from '../pages/AdminDashBoard';
import CreateProduct from '../component/CreateProduct';
import UpdateProduct  from '../component/UpdateProduct';
import UserProfilePage from '../pages/UserProfilePage';
import PaymentPage from '../pages/PaymentPage';
import ProfileUpdate from '../component/ProfileUpdate';


const adminRoutes =[
    {
        path:"/admin",
        component:AdminDashBoard
    },
    {
        path:"/createProduct",
        component:CreateProduct
    },
    {
        path:"/updateProduct",
        component:UpdateProduct
    },
    // { 
    //     path:"/profile",
    //     component:UserProfilePage
    // },
    // {
    //     path:"/pay",
    //     component:PaymentPage
    // },
    // {
    //     path:"/profileUpdate",
    //     component:ProfileUpdate
    // }
   
]

export default adminRoutes