import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

  const URL = "http://localhost:8080/products";

  const fetchData = () => {
    try {
      axios.get(URL).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // axios POST request
const options = {
  url: URL,
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data: {
    name: {name},
    price: {price},
    quantity: {quantity}
  }
};

  const postData = async (e) =>{
    e.preventDefault();
    axios(options)
    .then(response => {
      console.log(response.status);
    });
  }

  useEffect(() => {
    fetchData();
    postData();
  }, []);

  return (
    <>
      <div>Back Office</div>
      <div>
        <div>Stock Information</div>
        <div>
          <div>ADD STOCK</div>
          <div>
            <form onSubmit={postData}>
              <input
                type="text"
                required
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="number"
                required
                placeholder="Enter Price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="number"
                required
                placeholder="Enter Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button type="submit">Enter</button>
            </form>
          </div>
        </div>
        <div>
          <div>
            {data.length > 0 && (
              <ul>
                {data.map((data) => (
                  <li key={data._id}>{data.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
