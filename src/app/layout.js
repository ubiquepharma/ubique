import "./globals.css";
import { ProductProvider } from "../store/ProductStore";

export const metadata = {
  keywords: "about, company, values, team",
  openGraph: {
    title:
      "Home | Ubique Pharma | Leading Pharmaceutical Company in India | Quality Medicines & Healthcare",
    description:
      "Ubique Pharma is a trusted pharmaceutical company in India, committed to delivering high-quality medicines and healthcare solutions. Explore our wide range of innovative and affordable pharmaceutical products for a healthier future.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased font-outfit">
        <ProductProvider>{children}</ProductProvider>
      </body>
    </html>
  );
}
