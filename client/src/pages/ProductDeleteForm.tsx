import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type ProductDeleteFormProps = {
  id: number;
  children: ReactNode;
};

function ProductDeleteForm({ id, children }: ProductDeleteFormProps) {
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/guitar/${id}`, {
          method: "delete",
        }).then((response) => {
          if (response.status === 204) {
            navigate("/shop");
          }
        });
      }}
    >
      <button type="submit">{children}</button>
    </form>
  );
}

export default ProductDeleteForm;