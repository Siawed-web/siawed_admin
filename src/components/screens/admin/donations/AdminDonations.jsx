import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { CheckCircleFill, ClockFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";
import styles from "./admin_donations.module.scss";

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      toast.error("Failed to load donations");
      console.error(error);
    } else {
      setDonations(data || []);
    }
    setLoading(false);
  };

  const totalRaised = donations
    .filter(d => d.status === 'Paid')
    .reduce((sum, d) => sum + parseFloat(d.amount), 0);

  return (
    <div className={styles.adminDonations}>
      <div className={styles.headerRow}>
        <h2>Donations Ledger</h2>
        <div className="text-success fw-bold">
          Total Raised: ₹{totalRaised.toLocaleString('en-IN')}
        </div>
      </div>

      {loading ? (
        <div className="text-center p-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className={styles.tableResponsive}>
          <table className={styles.donationsTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Donor Name</th>
                <th>Contact</th>
                <th>Frequency</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id}>
                  <td>{new Date(donation.created_at).toLocaleDateString()}</td>
                  <td>
                    {donation.is_anonymous ? (
                      <span className={styles.anonymous}>Anonymous</span>
                    ) : (
                      <span className="fw-bold">{donation.donor_name}</span>
                    )}
                  </td>
                  <td>
                    {donation.is_anonymous ? (
                      <span className="text-muted">Hidden</span>
                    ) : (
                      <div style={{ fontSize: '0.9rem' }}>
                        <div>{donation.email}</div>
                        <div>{donation.phone}</div>
                      </div>
                    )}
                  </td>
                  <td className="text-capitalize">{donation.frequency.replace('-', ' ')}</td>
                  <td className={styles.amount}>₹{parseFloat(donation.amount).toLocaleString('en-IN')}</td>
                  <td>
                    {donation.status === "Paid" ? (
                      <span className={`${styles.badge} ${styles.paid}`}><CheckCircleFill /> Paid</span>
                    ) : (
                      <span className={`${styles.badge} ${styles.pending}`}><ClockFill /> Pending</span>
                    )}
                  </td>
                </tr>
              ))}
              {donations.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted p-4">No donations recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDonations;
