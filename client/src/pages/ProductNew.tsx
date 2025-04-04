import { useNavigate } from "react-router-dom";

import ProductForm from "./ProductForm";

function ProductNew() {
  const navigate = useNavigate();

  const newProduct = {
    name: "",
    brand: "",
    price: 0,
    image: "",
    type: "",
    idcategory: [],
  };

  return (
    <ProductForm
      defaultValue={newProduct}
      onSubmit={(productData) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/guitar`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        })
          .then((response) => response.json())
          .then((data) => {
            navigate(`/guitar/${data.insertId}`);
          });
      }}
    >
      Ajouter
    </ProductForm>
  );
}

export default ProductNew;
