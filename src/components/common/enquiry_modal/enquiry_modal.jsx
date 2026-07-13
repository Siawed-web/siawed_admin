import React from 'react';
import { Modal, Form, Button, InputGroup } from 'react-bootstrap';
import styles from './enquiry_modal.module.scss';
import { CaretDownFill } from 'react-bootstrap-icons';

const EnquiryModal = ({ show, setShow }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        setShow(false);
    };

    return (
        <Modal show={show} onHide={() => setShow(false)} centered className={styles.enquiryModal} size="md">
            <Modal.Header closeButton className={styles.modalHeader}>
                <Modal.Title className={styles.modalTitle}>Enquire Now</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Name *" required className={styles.formControl} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="City of Residence *" required className={styles.formControl} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="Email *" required className={styles.formControl} />
                    </Form.Group>

                    <InputGroup className={`mb-3 ${styles.phoneInputGroup}`}>
                        <InputGroup.Text className={styles.flagAddon}>
                            <img src="https://flagcdn.com/w20/in.png" alt="India Flag" className={styles.flagIcon} />
                            <CaretDownFill className={styles.caretIcon} />
                        </InputGroup.Text>
                        <Form.Control type="tel" placeholder="Phone Number *" required className={styles.formControl} />
                    </InputGroup>



                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Travel Destination *" required className={styles.formControl} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Date of Travel *"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => { if (!e.target.value) e.target.type = "text" }}
                            required
                            className={styles.formControl}
                        />
                    </Form.Group>


                    <Form.Group className="mb-4">
                        <Form.Select required className={styles.formControl} defaultValue="">
                            <option value="" disabled hidden>Vacation Type *</option>
                            <option value="leisure">Leisure</option>
                            <option value="business">Business</option>
                            <option value="honeymoon">Honeymoon</option>
                            <option value="family">Family</option>
                            <option value="other">Other</option>
                        </Form.Select>
                    </Form.Group>

                    <Button type="submit" className={styles.submitBtn}>
                        Submit Enquiry
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EnquiryModal;
