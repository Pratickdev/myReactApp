import { RouterProvider } from "react-router-dom";
import router from "./assets/routing/routes.tsx";
import { useState, createContext } from "react";
export const MyContext = createContext<any>("");
export default function Layout() {
  const [category, setCategory] = useState<any>("");
  const [cartCount, setCartCount] = useState<number>(0);
  ////////// This function handel the categpry changes on rectcontext///////////////////////
  function categoryHandler(e: any) {
    // console.log(e);
    setCategory(e);
  }
////////// This function handel the Cartcount changes on rectcontext ///////////////////////
  function cartCountHandler(e: any) {
    setCartCount(e);
    //console.log(cartCount);
  }
  return (
    <MyContext.Provider
      value={{ cartCount, category, cartCountHandler, categoryHandler }}
    >
      <RouterProvider router={router}></RouterProvider>
    </MyContext.Provider>
  );
}
