// -- Media & Styling
import "./styles/App.css";
// -- Components
import Flashcard from "./Flashcard/Flashcard";
import Navbar from "./Navbar/Navbar";

//Fixes mobile scroll bug
import Div100vh from "react-div-100vh";

const App = () => {
  return (
    <Div100vh className="App">
      <Flashcard />
      <Navbar />
    </Div100vh>
  );
};

export default App;
