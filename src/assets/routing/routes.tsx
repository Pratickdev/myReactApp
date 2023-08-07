import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Productdetails from "../../Productdetails";
import Login from "../../Login";
import Logout from "../../Logout";
import Cart from "../../Cart";

const router=createBrowserRouter([
    {path: '/' , element:<App/>},
    {path: '/details/:id' , element:<Productdetails/>},
    {path: '/login' , element:<Login/>},
    {path: '/logout' , element:<Logout/>},
    {path: '/cart' , element:<Cart/>},
])

export default router;