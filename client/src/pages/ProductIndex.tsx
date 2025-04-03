import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Product= {
  idproduct: number;
  name: string;
  image: string;
};

function ProductIndex() {
  const [product, setProduct] = useState([] as Product[]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/guitar`)
      .then((response) => response.json())
      .then((data: Product[]) => {
        setProduct(data);
      });
  }, []);

  return (
    <>
      <Link to={"/guitar/new"}>Ajouter</Link>
      <ul>
        {product.map((product) => (
          <li key={product.idproduct}>
            <h3><Link to={`/guitar/${product.idproduct}`}>{product.name}</Link></h3>
            <img src={product.image} alt={product.name} width="150"/>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductIndex;