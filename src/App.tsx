import Hompage from "./Hompage";
import { MyContext } from "./Layout";
import Navbar from "./Navbar";
import { useContext } from "react";
function App() {
  ////// Stroting the props value from child and passing them to the parent layout component///////////////
  let { categoryHandler, cartCountHandler, searchHandler } = useContext(MyContext);

  return (
    <>
      <Navbar categoryHandler={categoryHandler} searchHandler={searchHandler}/>
      <Hompage cartCountHandler={cartCountHandler} 
      />
    </>
  );
}

export default App;
