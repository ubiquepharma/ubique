import AdminSideHeader from "@/components/admin/AdminSideHeader";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }) => {
  const cookieStore = await cookies();

  if (!cookieStore.get("token")?.value) {
    redirect("/reboots");
  }

  return (
    <div className="flex">
      <AdminSideHeader />
      {children}
    </div>
  );
};

export default AdminLayout;
