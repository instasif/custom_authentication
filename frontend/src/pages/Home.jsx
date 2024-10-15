import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError } from "./utils/toast";
import { ToastContainer } from "react-toastify";

function Home() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleError("user log out!!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:5000/products";
      const res = await fetch(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const result = await res.json();
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="">
      <h1>{loggedInUser}</h1> <br />
      <h4>Total products: {products.length}</h4>
      <div>
        {products?.map((items) => (
          <ul key={items.id}>
            <span>{items.name} : {items.price}</span>
          </ul>
        ))}
      </div>
      <button onClick={handleLogout} className="btn bg-purple-800">
        Logout
      </button>
      <ToastContainer />
    </section>
  );
}

export default Home;
