import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  //declare and set initial values
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

  //Route from API

  const URL = "http://localhost:8080/products";

  const options = {
    url: URL,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      name,
      price,
      quantity,
    },
  };

  //Fetch all products route integration
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(URL).then((response) => {
          setData(response.data);
          console.log(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  //Create new product route integration
  const postData = async (e) => {
    e.preventDefault();
    try {
      await axios(options).then((response) => {
        console.log(response.data);
        console.log(response.status);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() =>{
    postData();
  }, [])

  return (
    <div>
      <h1>Back Office</h1>
      <div>
        <h2>Stock Information</h2>
        <div>
          <form onSubmit={postData}>
            <input
              type="text"
              required
              placeholder="Product Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              required
              placeholder="Product Price..."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              required
              placeholder="Product Quantity..."
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button type="submit">Enter</button>
          </form>
        </div>
        <h1>Current Stock</h1>
        <div>
          {data.length > 0 && (
            <ul>
              {data.map((data) => (
                <li key={data._id}>
                  {data.name}, Ksh. {data.price} Quantity: {data.quantity}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
