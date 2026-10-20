import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/CardProduct";
import { apiProducts } from "./apis";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const filteredProducts = products.filter((product) => {
    const query = input.trim().toLowerCase();
    if (!query) return true;

    return (
      product.title?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query) ||
      product.sku?.toLowerCase().includes(query) ||
      product.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  function handleUserInput(e) {
    setInput(e.target.value);
  }
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(apiProducts);
        if (!res.ok) {
          throw new Error("No se ha podido completar la llamada");
        }
        const data = await res.json();
        const mapped = data.products.map(
          ({
            id,
            title,
            description,
            price,
            sku,
            thumbnail,
            availabilityStatus,
            rating,
            reviews,
            tags,
          }) => ({
            id,
            title,
            description,
            price,
            sku,
            thumbnail,
            availabilityStatus,
            rating,
            reviews,
            tags,
          }),
        );

        setProducts(mapped);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) return <p>Cargando...</p>;
  return (
    <div className="border">
      <h1 className="p-5 border text-center">Catálogo de Productos</h1>
      <div className="border text-center p-5 m-5">
        <h2>Filtros</h2>
        <input className="border" value={input} onChange={handleUserInput} />
      </div>
      <div className="grid mx-5 mt-5 grid-cols-3 grid-rows-5 gap-5">
        {filteredProducts.map(
          ({
            id,
            title,
            description,
            price,
            sku,
            thumbnail,
            availabilityStatus,
            rating,
            reviews,
            tags,
          }) => {
            return (
              <ProductCard
                key={id}
                title={title}
                description={description}
                price={price}
                sku={sku}
                thumbnail={thumbnail}
                availabilityStatus={availabilityStatus}
                rating={rating}
                reviews={reviews}
                tags={tags}
              />
            );
          },
        )}
      </div>
    </div>
  );
}

export default App;
