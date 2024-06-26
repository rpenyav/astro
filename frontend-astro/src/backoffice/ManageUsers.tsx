import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import useCrud from "../hooks/useCrud";
import { User, CreateUser } from "../interfaces/user";
import { ZodiacSignCode, zodiacSignLiterals } from "../interfaces/signos.enum";

const ManageUsers: React.FC = () => {
  const {
    items: users,
    loading,
    error,
    page,
    pageSize,
    showModal,
    isEditing,
    newItem: newUser,
    setPage,
    setShowModal,
    handleInputChange,
    handleCreateItem,
    handleEditItem,
    handleUpdateItem,
    handleDeleteItem,
  } = useCrud<User, CreateUser>("/auth", {
    name: "",
    email: "",
    password: "",
    zodiacSign: "",
    birthDate: undefined,
    role: "user",
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Manage Users</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add User
      </Button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Birth Date</th>
            <th>Zodiac Sign</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.birthDate
                  ? new Date(user.birthDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                {user.zodiacSignCode
                  ? zodiacSignLiterals[user.zodiacSignCode as ZodiacSignCode].es
                  : "N/A"}
              </td>
              <td>
                <Button variant="warning" onClick={() => handleEditItem(user)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteItem(user._id)}
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
          disabled={users.length < pageSize}
        >
          Next
        </Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                placeholder={
                  isEditing ? "Leave blank to keep current password" : ""
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={
                  newUser.birthDate
                    ? newUser.birthDate.toISOString().split("T")[0]
                    : ""
                }
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Zodiac Sign</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="zodiacSign"
                value={newUser.zodiacSign}
                onChange={handleInputChange}
              >
                <option value="">Select Zodiac Sign</option>
                {Object.entries(ZodiacSignCode).map(([key, value]) => (
                  <option key={value} value={value}>
                    {zodiacSignLiterals[value as ZodiacSignCode].es}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={newUser.role}
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
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageUsers;
