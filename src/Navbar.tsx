import { Link, useLocation } from "react-router-dom";
import logo from "../src/assets/images/cartimg.jpg";
import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "./Layout";
import axios from "axios";
export default function Navbar(props: any) {
  ////////// Login Funtionality ///////////
  const [login, setLogin] = useState("");
  const loginStatus = useSelector((state: any) => state.login.status);
  const localData = "" + localStorage.getItem("login");
  ///////////////////////
  const [isshow, setIsshow] = useState(true);
  let location = useLocation();
  let cartCount = useContext(MyContext);
  cartCount = cartCount.cartCount;
  useEffect(() => {
    if (loginStatus != "") {
      setLogin(loginStatus);
      //console.log(loginStatus);
    } else {
      setLogin(localData);
    }
    if (
      location.pathname.indexOf("/details") > -1 ||
      location.pathname.indexOf("/login") > -1 ||
      location.pathname.indexOf("/cart") > -1
    ) {
      setIsshow(false);
    }
    getAllcategory();
  }, [location]);

  ///////////////////// Fetch dynamic category list ///////////////////
  const [allData, setAlldata] = useState([]);
  const [Err, setErr] = useState("");
  function getAllcategory() {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => {
        setAlldata(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setErr(err);
      });
  }
  if (Err) return <p>{Err}</p>;
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="cart-image" height="50px" width="50px" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* <a className="nav-link active" aria-current="page" href="/">Home</a> */}
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              {login != "" ? (
                <Link className="nav-link" to="/logout">
                  Log Out
                </Link>
              ) : (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}
            </li>
            {isshow ? (
              <li className="nav-item dropdown">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(event) => {
                    props.categoryHandler(event.target.value);
                  }}
                >
                  <option value="">All Ctegory</option>
                  {allData.map((eachcategory, i) => {
                    return (
                      <option value={eachcategory} key={i}>
                        {eachcategory}
                      </option>
                    );
                  })}
                </select>
              </li>
            ) : (
              ""
            )}
          </ul>
          <div className="d-flex">
            <label>{cartCount}</label>
            <Link to="/cart">
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
