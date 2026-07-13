import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { CircleFill, CheckCircleFill, GearFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";
import styles from "./admin_procurement.module.scss";

const AdminProcurement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('procurement_requests')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      toast.error("Failed to load procurement requests");
      console.error(error);
    } else {
      setRequests(data || []);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('procurement_requests')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      toast.success("Status updated successfully");
      
      // Update local state to reflect change without refetching
      setRequests(prev => prev.map(req => 
        req.id === id ? { ...req, status: newStatus } : req
      ));
      
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  const renderStatusBadge = (status) => {
    switch(status) {
      case 'Open':
        return <span className={`${styles.badge} ${styles.open}`}><CircleFill size={10} /> Open</span>;
      case 'In Progress':
        return <span className={`${styles.badge} ${styles['in-progress']}`}><GearFill size={12} /> In Progress</span>;
      case 'Closed':
        return <span className={`${styles.badge} ${styles.closed}`}><CheckCircleFill size={12} /> Closed</span>;
      default:
        return <span className={`${styles.badge} ${styles.open}`}>{status}</span>;
    }
  };

  return (
    <div className={styles.adminProcurement}>
      <div className={styles.headerRow}>
        <h2>Procurement Requests</h2>
        <div className="text-muted">Total: {requests.length}</div>
      </div>

      {loading ? (
        <div className="text-center p-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className={styles.tableResponsive}>
          <table className={styles.procurementTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Organization</th>
                <th>Contact Person</th>
                <th>Requirement</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{new Date(req.created_at).toLocaleDateString()}</td>
                  <td className="fw-bold">{req.organization}</td>
                  <td>{req.contact_person}</td>
                  <td className={styles.requirement} title={req.requirement}>{req.requirement}</td>
                  <td>{req.quantity}</td>
                  <td>
                    {renderStatusBadge(req.status)}
                  </td>
                  <td>
                    <select 
                      className={styles.actionSelect}
                      value={req.status}
                      onChange={(e) => handleStatusChange(req.id, e.target.value)}
                    >
                      <option value="Open">Mark Open</option>
                      <option value="In Progress">Mark In Progress</option>
                      <option value="Closed">Mark Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted p-4">No procurement requests recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProcurement;
