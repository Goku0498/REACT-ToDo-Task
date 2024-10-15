/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ToDo from "./ToDo";
import "./index.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    name: "",
    description: "",
    status: "Not Completed",
  });
  const [filter, setFilter] = useState("All");
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const addTodo = () => {
    if (newTodo.name && newTodo.description) {
      setTodos([...todos, { ...newTodo, id: Date.now() }]);
      setNewTodo({ name: "", description: "", status: "Not Completed" });
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, updatedData) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updatedData } : todo))
    );
    setEditId(null);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Completed") return todo.status === "Completed";
    if (filter === "Not Completed") return todo.status === "Not Completed";
    return true;
  });

  return (
    <div className="app">
      <h1>My Todo</h1>
      <div className="todo-input">
        <input
          type="text"
          name="name"
          placeholder="Todo Name"
          value={newTodo.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Todo Description"
          value={newTodo.description}
          onChange={handleChange}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <div className="filter-section">
        <label>Status Filter: </label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>
      </div>

      <div className="todos">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <ToDo
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
              isEditing={editId === todo.id}
              setEditId={setEditId}
            />
          ))
        ) : (
          <p>No todos to display</p>
        )}
      </div>
    </div>
  );
};

export default App;
