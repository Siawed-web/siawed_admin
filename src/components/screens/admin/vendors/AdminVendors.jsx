import React, { useState, useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { Eye, CheckCircleFill, ClockFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";
import CustomButton from "@/components/ui/custom_button/custom_button";
import styles from "./admin_vendors.module.scss";

const AdminVendors = () => {
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
      .from('wenba_vendors')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      toast.error("Failed to load vendor submissions");
      console.error(error);
    } else {
      setSubmissions(data || []);
    }
    setLoading(false);
  };

  const handleViewDetails = async (submission) => {
    setSelectedSubmission(submission);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSubmission(null);
  };

  const DataRow = ({ label, value }) => {
    if (value === undefined || value === null || value === "") return null;
    return (
      <div className={styles.dataRow}>
        <div className={styles.dataLabel}>{label}:</div>
        <div className={styles.dataValue}>
          {Array.isArray(value) ? value.join(", ") : 
           typeof value === 'boolean' ? (value ? "Yes" : "No") : value}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.adminContacts}>
      <div className={styles.headerRow}>
        <h2>Vendor Registrations</h2>
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
                <th>Business Name</th>
                <th>Contact Person</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub.id}>
                  <td>{new Date(sub.created_at).toLocaleDateString()}</td>
                  <td className="fw-bold">{sub.business_name}</td>
                  <td>{sub.contact_person}</td>
                  <td>{sub.email_address}</td>
                  <td>{sub.mobile_number}</td>
                  <td>
                    <button className={styles.viewBtn} onClick={() => handleViewDetails(sub)}>
                      <Eye /> View
                    </button>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted p-4">No vendor registrations found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Vendor Registration Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalContent}>
          {selectedSubmission && (
            <>
              <div className={styles.sectionBlock}>
                <h5>Company Details</h5>
                <DataRow label="Business Name" value={selectedSubmission.business_name} />
                <DataRow label="Contact Person" value={selectedSubmission.contact_person} />
                <DataRow label="Designation" value={selectedSubmission.designation} />
                <DataRow label="Mobile Number" value={selectedSubmission.mobile_number} />
                <DataRow label="WhatsApp Number" value={selectedSubmission.whatsapp_number} />
                <DataRow label="Email Address" value={selectedSubmission.email_address} />
                <DataRow label="Website" value={selectedSubmission.website} />
                <DataRow label="Business Address" value={selectedSubmission.business_address} />
                <DataRow label="City" value={selectedSubmission.city} />
                <DataRow label="State" value={selectedSubmission.state} />
                <DataRow label="PIN Code" value={selectedSubmission.pin_code} />
                <DataRow label="GST Number" value={selectedSubmission.gst_number} />
                <DataRow label="Year Established" value={selectedSubmission.year_established} />
                <DataRow label="Business Type" value={selectedSubmission.business_type} />
              </div>

              <div className={styles.sectionBlock}>
                <h5>Product Information</h5>
                <DataRow label="Product Category" value={selectedSubmission.product_category} />
                <DataRow label="Company Description" value={selectedSubmission.company_description} />
                <DataRow label="Best Selling Products" value={selectedSubmission.best_selling_products} />
                <DataRow label="Unique Selling Points" value={selectedSubmission.unique_selling_points} />
                {selectedSubmission.catalogue_url && (
                  <div className={styles.dataRow}>
                    <div className={styles.dataLabel}>Product Catalogue:</div>
                    <div className={styles.dataValue}>
                      <a href={selectedSubmission.catalogue_url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary me-2" style={{ marginRight: '8px' }}>
                        View
                      </a>
                      <a href={selectedSubmission.catalogue_url} download target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
                        Download
                      </a>
                    </div>
                  </div>
                )}
                {selectedSubmission.product_image_urls && selectedSubmission.product_image_urls.length > 0 && (
                  <div className={styles.dataRow}>
                    <div className={styles.dataLabel}>Product Images:</div>
                    <div className={styles.dataValue}>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '5px' }}>
                        {selectedSubmission.product_image_urls.map((url, i) => (
                          <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                            <img src={url} alt={`Product ${i+1}`} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.sectionBlock}>
                <h5>Pricing & Production</h5>
                <DataRow label="Retail Price Range" value={selectedSubmission.retail_price_range} />
                <DataRow label="Wholesale Price Range" value={selectedSubmission.wholesale_price_range} />
                <DataRow label="Minimum Order Quantity" value={selectedSubmission.minimum_order_quantity} />
                <DataRow label="Monthly Production Capacity" value={selectedSubmission.monthly_production_capacity} />
                <DataRow label="Packaging Options" value={selectedSubmission.packaging_options} />
                <DataRow label="Custom Branding" value={selectedSubmission.custom_branding} />
              </div>

              <div className={styles.sectionBlock}>
                <h5>Delivery & Operations</h5>
                <DataRow label="Delivery Timeline" value={selectedSubmission.delivery_timeline} />
                <DataRow label="Areas Served" value={selectedSubmission.areas_served} />
                <DataRow label="Shipping Partner" value={selectedSubmission.shipping_partner} />
                <DataRow label="Certifications" value={selectedSubmission.certifications} />
              </div>

              <div className={styles.sectionBlock}>
                <h5>Corporate Gifting & Promotions</h5>
                <DataRow label="Suitable for Gifting" value={selectedSubmission.suitable_for_gifting} />
                <DataRow label="Provide Samples" value={selectedSubmission.provide_samples} />
                <DataRow label="Sample Details" value={selectedSubmission.sample_details} />
                <DataRow label="Interested In" value={selectedSubmission.interested_in} />
              </div>
              
              <div className={styles.sectionBlock}>
                <h5>Declaration</h5>
                <DataRow label="Authorized Directories" value={selectedSubmission.authorized_directories} />
                <DataRow label="Additional Comments" value={selectedSubmission.additional_comments} />
                <DataRow label="Consent Agreed" value={selectedSubmission.consent_agreed} />
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

export default AdminVendors;
