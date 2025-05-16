import ProductsPage from "@/components/admin/ProductsPage";
import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full">
      <ProductsPage showSection={true} />
    </div>
  );
};

export default Dashboard;
