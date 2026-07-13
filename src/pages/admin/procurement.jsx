import React from "react";
import Head from "next/head";
import AdminLayout from "@/components/layout/AdminLayout/AdminLayout";
import AdminProcurement from "@/components/screens/admin/procurement/AdminProcurement";

const AdminProcurementPage = () => {
  return (
    <>
      <Head>
        <title>Admin Procurement - SIAWED</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AdminLayout title="Procurement Requests">
        <AdminProcurement />
      </AdminLayout>
    </>
  );
};

export default AdminProcurementPage;
