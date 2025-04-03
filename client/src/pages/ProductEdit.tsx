import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProductForm from "./ProductForm";

type Product = {
  idproduct: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  type: string;
  idcategory: number;
};

function ProductEdit() {
  const navigate = useNavigate();

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
      <ProductForm
        defaultValue={product}
        onSubmit={(productData) => {
          fetch(
            `${import.meta.env.VITE_API_URL}/api/guitar/${product.idproduct}`,
            {
              method: "put",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(productData),
            },
          ).then((response) => {
            if (response.status === 204) {
              navigate(`/guitar/${product.idproduct}`);
            }
          });
        }}
      >
        Modifier
      </ProductForm>
    )
  );
}

export default ProductEdit;
