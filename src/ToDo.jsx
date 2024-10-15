/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

const ToDo = ({ todo, onDelete, onUpdate, isEditing, setEditId }) => {
  const [editData, setEditData] = useState({
    name: todo.name,
    description: todo.description,
    status: todo.status,
  });

  const handleStatusChange = (e) => {
    onUpdate(todo.id, { status: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    onUpdate(todo.id, editData);
    setEditId(null);
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <div className="todo-card">
      {isEditing ? (
        <>
          <input
            type="text"
            name="name"
            value={editData.name}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="description"
            value={editData.description}
            onChange={handleEditChange}
          />
          <button onClick={saveEdit}>Save</button>
          <button onClick={() => setEditId(null)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>Name: {todo.name}</h3>
          <p>Description: {todo.description}</p>
          <p>
            Status:
            <select value={todo.status} onChange={handleStatusChange}>
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
            </select>
          </p>
          <div className="buttons">
            <button className="edit-btn" onClick={() => handleEdit(todo.id)}>
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ToDo;
