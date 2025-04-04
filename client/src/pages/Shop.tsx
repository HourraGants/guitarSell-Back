import { useEffect, useState } from "react";
import Style from "./Shop.module.css";
import { Link } from "react-router-dom";
import ProgramDeleteForm from "./ProductDeleteForm";

type Product = {
  idproduct: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  type: string;
}

function Shop() {
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:3310/api/guitar")
      .then((response) => {
        if (!response.ok) {
          throw new Error("le Fetch n'a pas réussi à récupérer les informations");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des guitares: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      <header>
        <nav>
          <a href="/" className={Style.navLink}>Home</a>
          <a href="/Shop" className={Style.navLink}>Shop</a>
          <a href="/About" className={Style.navLink}>About</a>
        </nav>
      </header>
      <section className={Style.container}>
        <div className={Style.content}>
          <h2>Liste des guitares disponibles sur le Shop</h2>
          <ul className={Style.card}>
            {products.map((product) => (
              <li key={product.idproduct}>
                <h3><Link to={`/guitar/${product.idproduct}`} className={Style.link}>{product.name}</Link></h3>
                <p>{product.brand}</p>
                <p>{product.price}€</p>
                <img src={product.image} alt={product.name} />
                <Link to={`/guitar/edit/${product.idproduct}`}>
                  <button type="button">Modifier</button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={Style.add}>
        <Link to={"/guitar/new"}><button type="button" className="button">Ajouter</button></Link>
        </div>
      </section>
    </>
  );
}

export default Shop;
