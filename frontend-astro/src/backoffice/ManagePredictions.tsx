// src/backoffice/ManagePredictions.tsx
import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  getAllHoroscopes,
  createHoroscope,
  updateHoroscope,
  deleteHoroscope,
} from "../services/horoscopeService";
import { Prediction } from "../interfaces/prediction";
import { ZodiacSignCode, zodiacSignLiterals } from "../interfaces/signos.enum";

const ManagePredictions: React.FC = () => {
  const [horoscopes, setHoroscopes] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentHoroscopeId, setCurrentHoroscopeId] = useState<string | null>(
    null
  );
  const [newHoroscope, setNewHoroscope] = useState<Prediction>({
    _id: "",
    signCode: "",
    prediction: "",
    date: "",
  });
  const [activeTab, setActiveTab] = useState("daily");
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchHoroscopes = async () => {
      try {
        const data = await getAllHoroscopes(activeTab, page, pageSize);
        setHoroscopes(data.list);
      } catch (error) {
        setError("Failed to fetch horoscopes.");
      } finally {
        setLoading(false);
      }
    };

    fetchHoroscopes();
  }, [activeTab, page, pageSize]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewHoroscope({ ...newHoroscope, [name]: value });
  };

  const handleCreateHoroscope = async () => {
    try {
      await createHoroscope(activeTab, newHoroscope);
      setShowModal(false);
      MySwal.fire("Success", "Horoscope created successfully!", "success");
      setNewHoroscope({
        _id: "",
        signCode: "",
        prediction: "",
        date: "",
      });
      const data = await getAllHoroscopes(activeTab, page, pageSize);
      setHoroscopes(data.list);
    } catch (error) {
      setError("Failed to create horoscope.");
    }
  };

  const handleEditHoroscope = (horoscope: Prediction) => {
    setNewHoroscope(horoscope);
    setCurrentHoroscopeId(horoscope._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleUpdateHoroscope = async () => {
    if (currentHoroscopeId) {
      try {
        await updateHoroscope(currentHoroscopeId, newHoroscope);
        setShowModal(false);
        MySwal.fire("Success", "Horoscope updated successfully!", "success");
        setNewHoroscope({
          _id: "",
          signCode: "",
          prediction: "",
          date: "",
        });
        const data = await getAllHoroscopes(activeTab, page, pageSize);
        setHoroscopes(data.list);
        setIsEditing(false);
        setCurrentHoroscopeId(null);
      } catch (error) {
        MySwal.fire("Error", "Failed to update horoscope.", "error");
      }
    }
  };

  const handleDeleteHoroscope = async (_id: string) => {
    try {
      await deleteHoroscope(_id);
      const data = await getAllHoroscopes(activeTab, page, pageSize);
      setHoroscopes(data.list);
      MySwal.fire("Deleted!", "Horoscope has been deleted.", "success");
    } catch (error) {
      setError("Failed to delete horoscope.");
    }
  };

  const confirmDeleteHoroscope = (_id: string) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteHoroscope(_id);
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Manage Predictions</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add prediction
      </Button>
      <table className="table">
        <thead>
          <tr>
            <th>Sign Code</th>
            <th>Prediction</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {horoscopes.map((horoscope) => (
            <tr key={horoscope._id}>
              <td>{horoscope.signCode}</td>
              <td>{horoscope.prediction}</td>
              <td>{new Date(horoscope.date).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditHoroscope(horoscope)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => confirmDeleteHoroscope(horoscope._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </Button>
        <Button
          onClick={() => setPage(page + 1)}
          disabled={horoscopes.length < pageSize}
        >
          Next
        </Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Edit Horoscope" : "Add Horoscope"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Sign Code</Form.Label>
              <Form.Select
                name="signCode"
                value={newHoroscope.signCode}
                onChange={handleInputChange}
              >
                <option value="">Select Sign</option>
                {Object.entries(ZodiacSignCode).map(([key, value]) => (
                  <option key={value} value={value}>
                    {zodiacSignLiterals[value as ZodiacSignCode].es}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Prediction</Form.Label>
              <Form.Control
                as="textarea"
                name="prediction"
                value={newHoroscope.prediction}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={
                  newHoroscope.date
                    ? new Date(newHoroscope.date).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={isEditing ? handleUpdateHoroscope : handleCreateHoroscope}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManagePredictions;
