export const dynamic = "force-dynamic";

import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import TopHeader from "@/components/global/TopHeader";
import WhatsAppButton from "@/components/global/WhatsAppButton";
import axios from "axios";

const MainTemplate = async ({ children }) => {
  const products = await getData();
  
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <div className="z-[1000] w-full">
        <TopHeader />
        <Header products={products} />
      </div>

      <div className="flex-1 lg:mt-[5rem] md:mt-[5rem] mt-[4rem]">
        {children}
      </div>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default MainTemplate;

async function getData() {
  try {
    const res = await axios.get(`${process.env.API_URL}/category`);

    const category = res.data.data;
    const categories = category.map((cat) => cat.category);

   async function getProducts() {
     const result = {};

     for (const cat of categories) {
       const response = await axios.get(
         `${process.env.API_URL}/product?category=${cat}&limit=6`
       );

       result[cat] = response.data.data;
     }

     return result;
   }

    const data = await getProducts()
    return data
  } catch (error) {
    console.log(error);
    return [];
  }
}
