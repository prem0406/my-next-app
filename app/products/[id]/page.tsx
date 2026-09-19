import { Product } from "../page";

async function getProduct(id: string) {
  console.log("Regenerated: ", Date.now());
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = (await response.json()) as Product;

  return product;
}
const ProductPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const product = await getProduct(id);
  return (
    <div className="px-20 pt-10">
      <h1 className="text-2xl font-bold">Product Details</h1>
      <p>
        Title: <strong>{product.title}</strong>
      </p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}</p>
      <p>Category: {product.category}</p>
      <p>Rating: {product.rating.rate}</p>
    </div>
  );
};

export default ProductPage;
