import React, { useState, useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { Eye, CheckCircleFill, ClockFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";
import CustomButton from "@/components/ui/custom_button/custom_button";
import styles from "./admin_contacts.module.scss";

const AdminContacts = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      toast.error("Failed to load contact submissions");
      console.error(error);
    } else {
      setSubmissions(data || []);
    }
    setLoading(false);
  };

  const handleViewDetails = async (submission) => {
    setSelectedSubmission(submission);
    setShowModal(true);
    
    // Mark as Read if it's currently Unread
    if (submission.status === 'Unread') {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: 'Read' })
        .eq('id', submission.id);
        
      if (!error) {
        // Update local state
        setSubmissions(prev => 
          prev.map(item => item.id === submission.id ? { ...item, status: 'Read' } : item)
        );
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSubmission(null);
  };

  const DataRow = ({ label, value }) => {
    if (!value) return null;
    return (
      <div className={styles.dataRow}>
        <div className={styles.dataLabel}>{label}:</div>
        <div className={styles.dataValue}>{value}</div>
      </div>
    );
  };

  return (
    <div className={styles.adminContacts}>
      <div className={styles.headerRow}>
        <h2>Contact Submissions</h2>
        <div className="text-muted">Total: {submissions.length}</div>
      </div>

      {loading ? (
        <div className="text-center p-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className={styles.tableResponsive}>
          <table className={styles.contactsTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub.id}>
                  <td>{new Date(sub.created_at).toLocaleDateString()}</td>
                  <td className="fw-bold">{sub.first_name} {sub.last_name}</td>
                  <td>{sub.email}</td>
                  <td>{sub.phone}</td>
                  <td>
                    {sub.status === "Read" ? (
                      <span className={`${styles.badge} ${styles.read}`}><CheckCircleFill className="me-1"/> Read</span>
                    ) : (
                      <span className={`${styles.badge} ${styles.unread}`}><ClockFill className="me-1"/> Unread</span>
                    )}
                  </td>
                  <td>
                    <button className={styles.viewBtn} onClick={() => handleViewDetails(sub)}>
                      <Eye /> View
                    </button>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted p-4">No contact submissions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Contact Submission Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalContent}>
          {selectedSubmission && (
            <>
              <div className={styles.sectionBlock}>
                <h5>Sender Information</h5>
                <DataRow label="First Name" value={selectedSubmission.first_name} />
                <DataRow label="Last Name" value={selectedSubmission.last_name} />
                <DataRow label="Email" value={selectedSubmission.email} />
                <DataRow label="Phone" value={selectedSubmission.phone} />
                <DataRow label="Date Sent" value={new Date(selectedSubmission.created_at).toLocaleString()} />
              </div>

              <div className={styles.sectionBlock}>
                <h5>Message</h5>
                <div style={{ whiteSpace: 'pre-wrap', padding: '10px', background: '#f8f9fa', borderRadius: '4px' }}>
                  {selectedSubmission.message}
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <CustomButton variant="ghost" onClick={handleCloseModal}>Close</CustomButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminContacts;
