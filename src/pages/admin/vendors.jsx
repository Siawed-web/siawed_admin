import React from "react";
import Head from "next/head";
import AdminLayout from "@/components/layout/AdminLayout/AdminLayout";
import AdminVendors from "@/components/screens/admin/vendors/AdminVendors";

const AdminVendorsPage = () => {
  return (
    <>
      <Head>
        <title>Admin Vendors - SIAWED</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AdminLayout title="Vendor Registrations">
        <AdminVendors />
      </AdminLayout>
    </>
  );
};

export default AdminVendorsPage;
