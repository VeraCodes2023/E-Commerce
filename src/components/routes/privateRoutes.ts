import UserProfilePage from '../pages/UserProfilePage';
import PaymentPage from '../pages/PaymentPage';
import ProfileUpdate from '../pages/ProfileUpdate';

const privateRoutes =[
    { 
        path:"/profile",
        component:UserProfilePage
    },
    {
        path:"/pay",
        component:PaymentPage
    },
    {
        path:"/profileUpdate",
        component:ProfileUpdate
    }
  
]

export default privateRoutes