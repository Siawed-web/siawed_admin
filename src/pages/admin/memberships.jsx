import React from "react";
import Head from "next/head";
import AdminLayout from "@/components/layout/AdminLayout/AdminLayout";
import AdminMemberships from "@/components/screens/admin/memberships/AdminMemberships";

const AdminMembershipsPage = () => {
  return (
    <>
      <Head>
        <title>Admin Memberships - SIAWED</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AdminLayout title="Membership Applications">
        <AdminMemberships />
      </AdminLayout>
    </>
  );
};

export default AdminMembershipsPage;
