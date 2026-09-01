import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/Layout";
import Product from "./pages/Products";
const  router =createBrowserRouter ([{
  path :"/",                      
  element:<Layout/>,            
  errorElement :(<div className="bg-red-300"></div>), //
  children :[                     
    {index:true, element:<Home/>}, 
     {path:"Product", element:<Product/>}, 
     
  ]
}]);





export default function App(){
  return  <><RouterProvider router={router} /></>;
}