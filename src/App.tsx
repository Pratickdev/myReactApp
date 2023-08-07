import Hompage from "./Hompage";
import { MyContext } from "./Layout";
import Navbar from "./Navbar";
import { useContext} from "react";
function App() {
  ////// Stroting the props value from child and passing them to the parent layout component///////////////
  let {categoryHandler,cartCountHandler} = useContext(MyContext);

  return (
    <>
     
        <Navbar categoryHandler={categoryHandler} />
        <Hompage cartCountHandler={cartCountHandler} />
      
    </>
  );
}

export default App;
