import React from "react";
import Head from "next/head";
import AdminLayout from "@/components/layout/AdminLayout/AdminLayout";
import AdminEvents from "@/components/screens/admin/events/AdminEvents";

const AdminDashboard = () => {
  return (
    <>
      <Head>
        <title>Admin Dashboard - SIAWED</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AdminLayout title="Events Management">
        <AdminEvents />
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;
