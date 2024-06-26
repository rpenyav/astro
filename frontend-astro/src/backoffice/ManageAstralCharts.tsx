import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import useCrud from "../hooks/useCrud";
import { AstroChart, CreateAstroChart } from "../interfaces/astroChart";
import { fetchUserName, fetchAllUsers } from "../services/astroChartService";

const ManageAstralCharts: React.FC = () => {
  const {
    items: astroCharts,
    loading,
    error,
    page,
    pageSize,
    showModal,
    isEditing,
    newItem: newAstroChart,
    setPage,
    setShowModal,
    handleInputChange,
    handleCreateItem,
    handleEditItem,
    handleUpdateItem,
    handleDeleteItem,
  } = useCrud<AstroChart, CreateAstroChart>("/astro-charts", {
    userId: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    chartData: {},
  });

  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
  const [allUsers, setAllUsers] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchUserNames = async () => {
      const userIds = Array.from(
        new Set(astroCharts.map((chart) => chart.userId))
      );
      const userNames: { [key: string]: string } = {};

      for (const userId of userIds) {
        try {
          const userName = await fetchUserName(userId);
          userNames[userId] = userName;
        } catch (error) {
          console.error(`Failed to fetch user name for ID: ${userId}`, error);
        }
      }

      setUserNames(userNames);
    };

    fetchUserNames();
  }, [astroCharts]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await fetchAllUsers();
        setAllUsers(Array.isArray(users) ? users : []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const isFormValid = () => {
    return (
      newAstroChart.userId &&
      newAstroChart.dateOfBirth &&
      newAstroChart.timeOfBirth &&
      newAstroChart.placeOfBirth &&
      JSON.stringify(newAstroChart.chartData) !== "{}"
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Manage Astral Charts</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Astral Chart
      </Button>
      <table className="table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Date of Birth</th>
            <th>Time of Birth</th>
            <th>Place of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {astroCharts.map((astroChart) => (
            <tr key={astroChart._id}>
              <td>{astroChart.userId}</td>
              <td>{userNames[astroChart.userId] || "Loading..."}</td>
              <td>{astroChart.dateOfBirth}</td>
              <td>{astroChart.timeOfBirth}</td>
              <td>{astroChart.placeOfBirth}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditItem(astroChart)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteItem(astroChart._id)}
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
          disabled={astroCharts.length < pageSize}
        >
          Next
        </Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Edit Astral Chart" : "Add Astral Chart"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>User ID</Form.Label>
              <Form.Select
                name="userId"
                value={newAstroChart.userId}
                onChange={handleInputChange}
              >
                <option value="">Select User</option>
                {allUsers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={newAstroChart.dateOfBirth}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Time of Birth</Form.Label>
              <Form.Control
                type="time"
                name="timeOfBirth"
                value={newAstroChart.timeOfBirth}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Place of Birth</Form.Label>
              <Form.Control
                type="text"
                name="placeOfBirth"
                value={newAstroChart.placeOfBirth}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Chart Data</Form.Label>
              <Form.Control
                as="textarea"
                name="chartData"
                value={JSON.stringify(newAstroChart.chartData, null, 2)}
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
            onClick={isEditing ? handleUpdateItem : handleCreateItem}
            disabled={!isFormValid()}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageAstralCharts;
