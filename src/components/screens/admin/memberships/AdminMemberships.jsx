import React, { useState, useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { Eye, CheckCircleFill, ClockFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";
import CustomButton from "@/components/ui/custom_button/custom_button";
import styles from "./admin_memberships.module.scss";

const AdminMemberships = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('membership_applications')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      toast.error("Failed to load applications");
      console.error(error);
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  };

  const handleViewDetails = (app) => {
    setSelectedApp(app);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedApp(null);
  };

  const DataRow = ({ label, value }) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;
    return (
      <div className={styles.dataRow}>
        <div className={styles.dataLabel}>{label}:</div>
        <div className={styles.dataValue}>
          {Array.isArray(value) ? value.join(", ") : value}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.adminMemberships}>
      <div className={styles.headerRow}>
        <h2>Membership Applications</h2>
        <div className="text-muted">Total: {applications.length}</div>
      </div>

      {loading ? (
        <div className="text-center p-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className={styles.tableResponsive}>
          <table className={styles.membershipsTable}>
            <thead>
              <tr>
                <th>Date Applied</th>
                <th>Name</th>
                <th>Membership Type</th>
                <th>City</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{new Date(app.created_at).toLocaleDateString()}</td>
                  <td className="fw-bold">{app.full_name}</td>
                  <td>{app.membership_type.split('–')[0].trim()}</td>
                  <td>{app.city}</td>
                  <td>
                    {app.payment_status === "Paid" ? (
                      <span className={`${styles.badge} ${styles.paid}`}><CheckCircleFill className="me-1"/> Paid</span>
                    ) : (
                      <span className={`${styles.badge} ${styles.pending}`}><ClockFill className="me-1"/> Pending</span>
                    )}
                  </td>
                  <td>
                    <button className={styles.viewBtn} onClick={() => handleViewDetails(app)}>
                      <Eye /> View
                    </button>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted p-4">No applications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="xl" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Application Details: {selectedApp?.full_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalContent}>
          {selectedApp && (
            <>
              <div className={styles.sectionBlock}>
                <h5>Personal Information</h5>
                <DataRow label="Full Name" value={selectedApp.full_name} />
                <DataRow label="Date of Birth" value={selectedApp.dob} />
                <DataRow label="Mobile" value={selectedApp.mobile_number} />
                <DataRow label="WhatsApp" value={selectedApp.whatsapp_number} />
                <DataRow label="Email" value={selectedApp.email} />
                <DataRow label="Location" value={`${selectedApp.city}, ${selectedApp.district}, ${selectedApp.state}`} />
                <DataRow label="LinkedIn" value={selectedApp.linkedin_profile} />
                <DataRow label="Instagram" value={selectedApp.instagram_page} />
              </div>

              <div className={styles.sectionBlock}>
                <h5>Membership & Education</h5>
                <DataRow label="Applied For" value={selectedApp.membership_type} />
                <DataRow label="Highest Education" value={selectedApp.highest_education} />
                <DataRow label="Field of Study" value={selectedApp.field_of_study} />
                <DataRow label="Current Occupation" value={selectedApp.current_occupation} />
              </div>

              {(selectedApp.business_name || selectedApp.type_of_business) && (
                <div className={styles.sectionBlock}>
                  <h5>Business Profile</h5>
                  <DataRow label="Business Name" value={selectedApp.business_name} />
                  <DataRow label="Role" value={selectedApp.business_role} />
                  <DataRow label="Year Started" value={selectedApp.year_business_started} />
                  <DataRow label="Type of Business" value={selectedApp.type_of_business} />
                  <DataRow label="Stage" value={selectedApp.business_stage} />
                  <DataRow label="Employees" value={selectedApp.number_of_employees} />
                  <DataRow label="Monthly Revenue" value={selectedApp.monthly_revenue} />
                </div>
              )}

              <div className={styles.sectionBlock}>
                <h5>Skills & Needs</h5>
                <DataRow label="Key Skills" value={selectedApp.key_skills} />
                <DataRow label="Support Needs" value={selectedApp.support_needs} />
                <DataRow label="Reason to Join" value={selectedApp.reason_to_join} />
                <DataRow label="Business Goals" value={selectedApp.business_goals} />
              </div>

              {selectedApp.mentor_years_exp && (
                <div className={styles.sectionBlock}>
                  <h5>Diamond Mentor Profile</h5>
                  <DataRow label="Years of Exp" value={selectedApp.mentor_years_exp} />
                  <DataRow label="Commitment Accepted" value={selectedApp.mentor_commitment} />
                </div>
              )}

              <div className={styles.sectionBlock}>
                <h5>Community & Referral</h5>
                <DataRow label="Wants to participate in" value={selectedApp.community_participation} />
                <DataRow label="Heard about SIAWED from" value={selectedApp.referral_source} />
              </div>

              <div className={styles.sectionBlock}>
                <h5>Payment & Consent</h5>
                <DataRow label="Status" value={selectedApp.payment_status} />
                {selectedApp.payment_screenshot_url && (
                  <div className={styles.dataRow}>
                    <div className={styles.dataLabel}>Receipt:</div>
                    <div className={styles.dataValue}>
                      <a href={selectedApp.payment_screenshot_url} target="_blank" rel="noreferrer" className="text-primary text-decoration-underline">
                        View Payment Screenshot
                      </a>
                    </div>
                  </div>
                )}
                <DataRow label="Consent Agreed" value={selectedApp.consent_agreed ? "Yes" : "No"} />
                <DataRow label="Signed By" value={`${selectedApp.consent_name} at ${selectedApp.consent_place} on ${selectedApp.consent_date}`} />
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

export default AdminMemberships;
