import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import useCrud from "../hooks/useCrud";
import { Content, CreateContent } from "../interfaces/content";

const ManageContents: React.FC = () => {
  const {
    items: contents,
    loading,
    error,
    page,
    pageSize,
    showModal,
    isEditing,
    newItem: newContent,
    setPage,
    setShowModal,
    handleInputChange,
    handleCreateItem,
    handleEditItem,
    handleUpdateItem,
    handleDeleteItem,
  } = useCrud<Content, CreateContent>("/contents", {
    title: "",
    body: "",
    author: "",
    tags: [],
  });

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    handleInputChange({
      target: {
        name: "tags",
        value: value.split(",").map((tag) => tag.trim()),
      },
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
      <h1>Manage Contents</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Content
      </Button>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th>Author</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((content) => (
            <tr key={content._id}>
              <td>{content.title}</td>
              <td>{content.body}</td>
              <td>{content.author}</td>
              <td>
                {Array.isArray(content.tags) ? content.tags.join(", ") : "N/A"}
              </td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditItem(content)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteItem(content._id)}
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
          disabled={contents.length < pageSize}
        >
          Next
        </Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Edit Content" : "Add Content"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newContent.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Body</Form.Label>
              <Form.Control
                type="text"
                name="body"
                value={newContent.body}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={newContent.author}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={
                  Array.isArray(newContent.tags)
                    ? newContent.tags.join(", ")
                    : ""
                }
                onChange={handleTagsChange}
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

export default ManageContents;
