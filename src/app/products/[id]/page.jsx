import Banner from "@/components/global/Banner";
import ProductDetails from "@/components/products/ProductDetails";
import MainTemplate from "@/templates/MainTemplate";
import axios from "axios";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getData(id);
  return {
    title: `${product.brand} | Ubique Pharma | Leading Pharmaceutical Company in India | Quality Medicines & Healthcare`,
  };
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = await getData(id);
  return (
    <MainTemplate>
      <Banner />
      <ProductDetails product={product} />
    </MainTemplate>
  );
}

async function getData(id) {
  try {
    const res = await axios.get(
      `${process.env.API_URL}/product?productId=${id}`
    );
    const data = res.data.data;
    return data[0];
  } catch (error) {
    console.log(error);
    return [];
  }
}
