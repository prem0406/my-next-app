export const revalidate = 60;

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

async function getProduct() {
  console.log("Regenerated: ", Date.now());
  const response = await fetch("https://fakestoreapi.com/products");
  const products = (await response.json()) as Product[];

  return products;
}

const ProductPage = async () => {
  const products = await getProduct();

  return (
    <div className="px-20 pt-10">
      <p className="text-center text-xl font-bold">Product Page</p>
      <div className="flex flex-col mt-4 gap-y-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-xl">
            <p>
              Title: <strong>{product.title}</strong>
            </p>
            <p>Price: {product.price}</p>
            <p>Desription: {product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
