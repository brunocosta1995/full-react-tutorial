import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {

  const navigate = useNavigate();

  function navigateHandler() {
    navigate('/products');
  }

  return (
    <>
      <h1>Home Page</h1>
      <p>
        Go to <Link to="/products">the list of the products</Link>
      </p>
      <p>
        <button onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
}
