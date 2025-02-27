import { useParams, Link } from "react-router-dom";

export default function ProductsDetailPage() {

    const params = useParams();

  return (
    <>
      <h1>Products Detail Page</h1>
      <h2>{params.productId}</h2>
      <Link to=".." relative='path'>Back</Link>
      
    </>
  );
}
