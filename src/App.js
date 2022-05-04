// -- Media & Styling
import "./styles/App.css";
// -- Components
import Flashcard from "./Flashcard/Flashcard";
import Navbar from "./Navbar/Navbar";

const App = () => {
  return (
    <div className="App">
      <Flashcard />
      <Navbar />
    </div>
  );
};

export default App;
