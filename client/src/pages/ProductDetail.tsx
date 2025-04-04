import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductDeleteForm from "./ProductDeleteForm";
import Style from "./ProductDetail.module.css";


type Product = {
  idproduct: number;
  name: string;
  price: number;
  image: string;
};

function ProgramDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null as null | Product);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/guitar/${id}`)
      .then((response) => response.json())
      .then((data: Product) => {
        setProduct(data);
      });
  }, [id]);

  return (
    product && (
      <div className={Style.container}>
        <h1>{product.name}</h1>
        <Link to={`/guitar/edit/${product.idproduct}`}>Modifier</Link>
        <img src={product.image} alt={product.name} width="200" />
        <ProductDeleteForm id={product.idproduct}>Supprimer</ProductDeleteForm>
      </div>
    )
  );
}

export default ProgramDetail;