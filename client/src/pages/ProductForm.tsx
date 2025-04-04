import type { ReactNode } from "react";
import Style from "./ProductForm.module.css";

type ProductData = {
  name: string;
  brand: string;
  price: number;
  image: string;
  type: string;
  idcategory: number;
};

interface ProductFormProps {
  children: ReactNode;
  defaultValue: ProductData;
  onSubmit: (program: ProductData) => void;
}

function ProductForm({ children, defaultValue, onSubmit }: ProductFormProps) {
  return (
    <div className={Style.container}>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);

          const name = formData.get("name") as string;
          const brand = formData.get("brand") as string;
          const price = formData.get("price") as string;
          const image = formData.get("image") as string;
          const type = formData.get("type") as string;
          const idcategory = formData.get("idcategory") as string;

          onSubmit({
            name,
            brand,
            price: Number.parseInt(price),
            image,
            type,
            idcategory: Number.parseInt(idcategory),
          });
        }}
        className={Style.form}
      >
        <label htmlFor="name">Name :</label>
        <input type="text" name="name" defaultValue={defaultValue.name} id="name"/>
        <label htmlFor="brand">Brand :</label>
        <input type="text" name="brand" defaultValue={defaultValue.brand} id="brand"/>
        <label htmlFor="price">Price :</label>
        <input type="number" name="price" defaultValue={defaultValue.price} id="price"/>
        <label htmlFor="image">Image URL :</label>
        <input type="text" name="image" defaultValue={defaultValue.image} id="image"/>
        <label htmlFor="type">Type :</label>
        <input type="text" name="type" defaultValue={defaultValue.type} id="type"/>
        <label htmlFor="category">Category :</label>
        <input type="" name="idcategory" defaultValue={defaultValue.idcategory ?? ''} id="category"/>
        <button type="submit">{children}</button>
      </form>
    </div>
  );
}

export default ProductForm;
