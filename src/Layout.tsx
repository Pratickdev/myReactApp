import { RouterProvider } from "react-router-dom";
import router from "./assets/routing/routes.tsx";
import { useState, createContext } from "react";
export const MyContext = createContext<any>("");
export default function Layout() {
  const [category, setCategory] = useState<any>("");
  const [cartCount, setCartCount] = useState<number>(0);
  const [search, setSearch] = useState("");
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
  ////////// This function handel the Search changes on rectcontext ///////////////////////
  function searchHandler(e: any) {
    setSearch(e);
  }
  return (
    <MyContext.Provider
      value={{
        cartCount,
        category,
        search,
        cartCountHandler,
        categoryHandler,
        searchHandler,
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </MyContext.Provider>
  );
}
