import { Suspense } from "react";
import { Product } from "../page";

/**
 * Streaming lets the server send HTML to the browser in pieces, as it becomes ready, instead of waiting for the entire page's data to load before sending anything.

Without streaming, if one part of your page is slow (say, a product list that takes 3 seconds to fetch), the user stares at a blank white screen for those full 3 seconds — even if the rest of the page (header, nav, footer) had nothing slow about it.

With streaming, the fast parts render immediately, and the slow parts show a loading state, then "pop in" once ready — all in a single page load, no client-side re-fetching required.

How it works in the App Router

Next.js's App Router uses React Server Components + Suspense to implement this. You wrap the slow part of your tree in <Suspense>, and give it a fallback.
 
 */

async function getProduct(id: string) {
  console.log("Regenerated: ", Date.now());
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  //   const product = (await response.json()) as Product;
  const product = await new Promise<Product>((resolve, reject) => {
    response.json().then((data) => {
      setTimeout(() => {
        resolve(data as Product);
      }, 3000); // Simulate a delay of 3 seconds
    });
  });

  return product;
}

const ProductInfo = async ({ id }: { id: string }) => {
  const product = await getProduct(id);
  return (
    <>
      <p>
        Title: <strong>{product.title}</strong>
      </p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}</p>
      <p>Category: {product.category}</p>
      <p>Rating: {product.rating.rate}</p>
    </>
  );
};

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return (
    <div className="px-20 pt-10">
      <h1 className="text-2xl font-bold">Product Details</h1>
      <Suspense fallback={<p>Loading product info...</p>}>
        <ProductInfo id={id} />
      </Suspense>
    </div>
  );
};

export default ProductPage;
