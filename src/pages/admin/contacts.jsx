import React from "react";
import Head from "next/head";
import AdminLayout from "@/components/layout/AdminLayout/AdminLayout";
import AdminContacts from "@/components/screens/admin/contacts/AdminContacts";

const AdminContactsPage = () => {
  return (
    <>
      <Head>
        <title>Admin Contacts - SIAWED</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AdminLayout title="Contact Submissions">
        <AdminContacts />
      </AdminLayout>
    </>
  );
};

export default AdminContactsPage;
