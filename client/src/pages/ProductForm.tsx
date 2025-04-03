import type { ReactNode } from "react";

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
    >
      <input type="text" name="title" defaultValue={defaultValue.name} />
      <input type="text" name="synopsis" defaultValue={defaultValue.brand} />
      <input type="number" name="poster" defaultValue={defaultValue.price} />
      <input type="text" name="country" defaultValue={defaultValue.image} />
      <input type="test" name="year" defaultValue={defaultValue.type} />
      <input type="" name="idcategory" defaultValue={defaultValue.idcategory ?? ''} />
      <button type="submit">{children}</button>
    </form>
  );
}

export default ProductForm;
