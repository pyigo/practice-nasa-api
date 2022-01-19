import { useState } from "react";
import axios from "axios";
import NASAData from "./components/NASAData";
import "./App.css";

// Creating state by declaring varibles
function App() {
  const [like, setLike] = useState("unliked");
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggle = () => {
    console.log("toggling");

    // Using ternary condition to implement like and dislike action
    like === "unliked" ? setLike("liked") : setLike("unliked");
  };

  const handleChange = (e) => {
    // console.log('handling change', e.target.value)
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting");

    setLoading(true);

    //  Using Axios to fetch API's data
    axios
      .get(`https://images-api.nasa.gov/search?q=${userInput}`)

      // running data from API response
      .then((response) => {
        setData(response.data.collection.items);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <h1>Spacetagram</h1>
      <p className="brought-by">Brought to you by NASA Astronomy Picture of the Day API</p>
      {console.log("state", data)}

      <form onSubmit={handleSubmit}>
        <label htmlFor="userInput">Browse: </label>
        <input
          type="text"
          id="userInput"
          name="userInput"
          onChange={handleChange}
          value={userInput}
        />
        <input className="submit" type="submit" value="submit" />
      </form>

      {loading ? (
        <img
          src="https://c.tenor.com/zecVkmevzcIAAAAM/please-wait.gif"
          alt=""
        />
      ) : (
        <div id="nasa-container">
          {data.map((item) => {
            return <NASAData item={item} />;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
