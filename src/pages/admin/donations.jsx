import React from "react";
import Head from "next/head";
import AdminLayout from "@/components/layout/AdminLayout/AdminLayout";
import AdminDonations from "@/components/screens/admin/donations/AdminDonations";

const AdminDonationsPage = () => {
  return (
    <>
      <Head>
        <title>Admin Donations - SIAWED</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AdminLayout title="Donations Ledger">
        <AdminDonations />
      </AdminLayout>
    </>
  );
};

export default AdminDonationsPage;
