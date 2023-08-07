import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { cartData } from "./redux/CartSlice";
import { MyContext } from "./Layout";
export default function Cart() {
  const cartProduct = useSelector((state: any) => state.cart.data);
  const dispath = useDispatch();
  /////////////// Cartcount and getting the cart count funtion  context/////////////////
  let cartCount = useContext(MyContext);
  let currentcartCount = cartCount.cartCount;
  let cartCountHandler = cartCount.cartCountHandler;
  useEffect(() => {}, [cartProduct]);
  //////// Remove cart item functionality done here

  function crossHandler(id: number) {
    var allproduct = cartProduct;
    var filteredObject = allproduct.filter(
      (jacket: { id: number }) => jacket.id !== id
    );
    dispath(cartData(filteredObject));
    cartCountHandler(currentcartCount - 1);
  }

  console.log(cartProduct);
  return (
    <>
      <Navbar />
      <ul className="list-group">
        {cartProduct.map(function (data: any) {
          return (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={data.id}
            >
              {data.name}
              <span className="badge badge-primary badge-pill">
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    crossHandler(data.id);
                  }}
                ></button>
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
