import "../src/assets/css/list.css";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
//import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./Layout";
import { useSelector, useDispatch } from "react-redux";
import { cartData } from "./redux/CartSlice";
export default function Hompage(Props: any) {
  /////////// Below is the demo of using rect query for api call ////////////
  // const { data: blogs, error ,isLoading } = useQuery<any, Error>({
  //   queryKey: ["blogs"],
  //   queryFn: () =>
  //     axios.get(dynamicURL).then((res) =>{setData(res.data)} ),
  //   });
  ////////// Login Funtionality ///////////
  const [login, setLogin] = useState("");
  const loginStatus = useSelector((state: any) =>
    state.login.status != "" ? state.login.status : ""
  );
  const localData = "" + localStorage.getItem("login");

  const dispath = useDispatch();
  /////////////////////////////////////// Get the category from context////////
  let selectedCategory = useContext(MyContext);
  selectedCategory = selectedCategory.category;
  ////////////// Get the cart count from rect context API ////////////
  let cartCount = useContext(MyContext);
  cartCount = cartCount.cartCount;
  //////////// Using use state to temporarily hold the API data ////////////
  ////// APi fetching via axios started ////////////////////////////////
  const [allData, setAlldata] = useState([]);
  const [Err, setErr] = useState("");
  /////////// If any category is selected then creating the link accordingly ///////////
  var dynamicURL =
    selectedCategory != ""
      ? "https://fakestoreapi.com/products/category/" + selectedCategory
      : "https://fakestoreapi.com/products";
  /////////////////// Using useefect hook to control the render of the component ////////////
  useEffect(() => {
    fetchdetails();
    if (loginStatus != "") {
      setLogin(loginStatus);
      //console.log(loginStatus);
    } else {
      setLogin(localData);
    }
  }, [dynamicURL]);
  /////////////////// Using axios to get the data///////////////////
  function fetchdetails() {
    axios
      .get(dynamicURL)
      .then((res) => {
        setAlldata(res.data);
      })
      .catch((err) => {
        setErr(err);
      });
  }
   ////////// Get cart data From redux  ///////////
   const cartProduct = useSelector((state: any) => state.cart.data);
  /////////// This event triggert after click the add to cart button //////////////
  const [clickedIndex, setClickedIndex] = useState<any>([]);
  function handelCartData(data: any, index: any) {
    Props.cartCountHandler(cartCount + 1);
    let allCartArray = [...cartProduct, data];
    //send data to redux
    dispath(cartData(allCartArray));
    let clickedindexArry=[...clickedIndex,index]
    setClickedIndex(clickedindexArry);
    window.scrollTo(0, 0);
    console.log(clickedIndex);
  }

  if (Err) return <p>{Err}</p>;
  return (
    <div className="row wraper">
      {allData.map((blog: any, index: number) => (
        <div className="col-md-3" style={{ padding: "10px" }} key={blog.id}>
          <Card style={{ width: "18rem", height: "311px" }}>
            <div className="text-center">
              <Card.Img
                variant="top"
                src={blog.image}
                style={{ width: "100px" }}
              />
            </div>
            <Card.Body>
              <Card.Title className="desc">{blog.title}</Card.Title>
              <Card.Text className="desc">{blog.description}</Card.Text>
            </Card.Body>
            <Card.Footer className="fotter">
              {login != "" ? (
                <>
                  <Link to={`details/${blog.id}`}>
                    <Button variant="primary">View Details</Button>
                  </Link>
                </>
              ) : (
                <Button variant="disabled">Login To View</Button>
              )}
              { clickedIndex.includes(index)? (
                <Button variant="success">Added TO Cart</Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => {
                    let data = {
                      name: blog.title,
                      desc: blog.description,
                      id: blog.id,
                    };
                    handelCartData(data, index);
                  }}
                >
                  Add TO Cart
                </Button>
              )}
            </Card.Footer>
          </Card>
        </div>
      ))}
    </div>
  );
}
