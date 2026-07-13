import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { List, X, CalendarEvent, BoxArrowRight, People, HeartFill, Shop, Envelope, Bag } from "react-bootstrap-icons";
import { supabase } from "@/lib/supabaseClient";
import styles from "./AdminLayout.module.scss";

const AdminLayout = ({ children, title = "Admin Dashboard" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        router.push("/");
      } else {
        setLoadingAuth(false);
      }
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/");
      }
    });
    
    return () => subscription.unsubscribe();
  }, [router]);
  
  const handleLogout = async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
    router.push("/");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const navItems = [
    { name: "Events", path: "/admin", icon: <CalendarEvent /> },
    { name: "Memberships", path: "/admin/memberships", icon: <People /> },
    { name: "Donations", path: "/admin/donations", icon: <HeartFill /> },
    { name: "Procurement", path: "/admin/procurement", icon: <Shop /> },
    { name: "Contacts", path: "/admin/contacts", icon: <Envelope /> },
    { name: "Vendor Registrations", path: "/admin/vendors", icon: <Bag /> },
  ];

  if (loadingAuth) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>Loading...</div>;
  }

  return (
    <div className={styles.adminLayout}>
      {/* Mobile Overlay */}
      <div 
        className={`${styles.mobileOverlay} ${sidebarOpen ? styles.open : ''}`} 
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <span>SIAWED Admin</span>
          <button className={styles.closeMenu} onClick={closeSidebar}>
            <X />
          </button>
        </div>
        
        <nav className={styles.sidebarNav}>
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`${styles.navItem} ${router.pathname === item.path ? styles.active : ''}`}
              onClick={closeSidebar}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <a href="/" className={styles.navItem} onClick={handleLogout}>
            <BoxArrowRight />
            <span>Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        <header className={styles.topbar}>
          <button className={styles.menuToggle} onClick={toggleSidebar}>
            <List />
          </button>
          <div className={styles.topbarTitle}>{title}</div>
        </header>

        <main className={styles.contentArea}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
