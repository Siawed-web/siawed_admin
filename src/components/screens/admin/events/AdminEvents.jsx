import React, { useState, useEffect } from "react";
import { Modal, Form, Spinner } from "react-bootstrap";
import { PencilSquare, Trash, PlusLg } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { supabase } from "@/lib/supabaseClient";
import styles from "./admin_events.module.scss";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: "",
    image_url: "",
    type: "event"
  });
  
  // File upload state
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: false });
      
    if (error) {
      toast.error("Failed to load events");
      console.error(error);
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  };

  // Handlers for Add/Edit Modal
  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentEvent(null);
    setFormData({
      title: "",
      description: "",
      event_date: "",
      image_url: "",
      type: "event"
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleOpenEdit = (event) => {
    setIsEditing(true);
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      event_date: event.event_date,
      image_url: event.image_url || "",
      type: event.type || "event"
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.image_url;
    
    // Generate unique filename
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('event-images')
      .upload(fileName, imageFile);
      
    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error("Failed to upload image");
    }
    
    // Retrieve public URL
    const { data } = supabase.storage
      .from('event-images')
      .getPublicUrl(fileName);
      
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Step 1: Handle image upload if a new file is selected
      let finalImageUrl = formData.image_url;
      if (imageFile) {
        finalImageUrl = await uploadImage();
      }
      
      const payload = {
        ...formData,
        image_url: finalImageUrl
      };

      // Step 2: Save to Database
      if (isEditing) {
        const { error } = await supabase
          .from('events')
          .update(payload)
          .eq('id', currentEvent.id);
          
        if (error) throw error;
        toast.success("Event updated successfully!");
      } else {
        const { error } = await supabase
          .from('events')
          .insert([payload]);
          
        if (error) throw error;
        toast.success("Event created successfully!");
      }
      
      fetchEvents();
      handleCloseModal();
      
    } catch (error) {
      toast.error(error.message || "Failed to process event");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
        
      if (error) {
        toast.error("Failed to delete event");
      } else {
        toast.success("Event deleted successfully");
        fetchEvents();
      }
    }
  };

  return (
    <div className={styles.adminEvents}>
      <div className={styles.headerRow}>
        <h2>Manage Events</h2>
        <CustomButton variant="blue" onClick={handleOpenAdd}>
          <PlusLg className="me-2" /> Add New Event
        </CustomButton>
      </div>

      {loading ? (
        <div className="text-center p-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className={styles.tableResponsive}>
          <table className={styles.eventsTable}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Type</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>
                    {event.image_url ? (
                      <img src={event.image_url} alt="event" className={styles.eventThumbnail} />
                    ) : (
                      <div className={styles.eventThumbnail} style={{ background: '#eee' }}></div>
                    )}
                  </td>
                  <td className="fw-bold">{event.title}</td>
                  <td className="text-capitalize">{event.type || 'event'}</td>
                  <td>{event.event_date}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.editBtn} onClick={() => handleOpenEdit(event)}>
                        <PencilSquare /> Edit
                      </button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(event.id)}>
                        <Trash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted p-4">No events found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Event' : 'Add New Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Event Title *</Form.Label>
              <Form.Control 
                type="text" 
                name="title"
                value={formData.title} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Event Type *</Form.Label>
              <Form.Select 
                name="type"
                value={formData.type} 
                onChange={handleChange} 
                required 
              >
                <option value="event">Event</option>
                <option value="webinar">Webinar</option>
                <option value="workshop">Workshop</option>
                <option value="business visit">Business Visit</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Event Date (YYYY-MM-DD) *</Form.Label>
              <Form.Control 
                type="date" 
                name="event_date"
                value={formData.event_date} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Event Image</Form.Label>
              {formData.image_url && !imageFile && (
                <div className="mb-2">
                  <img 
                    src={formData.image_url} 
                    alt="Current" 
                    style={{ height: '80px', borderRadius: '4px', objectFit: 'cover' }} 
                  />
                  <div className="small text-muted mt-1">Current image</div>
                </div>
              )}
              <Form.Control 
                type="file" 
                accept="image/*"
                onChange={handleFileChange} 
              />
              <Form.Text className="text-muted">
                {isEditing ? "Upload a new image to replace the current one, or leave blank to keep it." : "Upload a cover image for this event."}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Description *</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={5} 
                name="description"
                value={formData.description} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <CustomButton variant="ghost" onClick={handleCloseModal} disabled={isSubmitting}>
                Cancel
              </CustomButton>
              <CustomButton type="submit" variant="blue" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><Spinner size="sm" className="me-2"/> {imageFile ? 'Uploading & Saving...' : 'Saving...'}</>
                ) : (
                  isEditing ? 'Update Event' : 'Create Event'
                )}
              </CustomButton>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminEvents;
