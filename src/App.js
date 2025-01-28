import React, { useState } from "react";
import "./App.css";

const InventoryApp = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Item A", category: "Category 1", quantity: 15 },
    { id: 2, name: "Item B", category: "Category 2", quantity: 8 },
    { id: 3, name: "Item C", category: "Category 1", quantity: 20 },
  ]);

  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: "" });
  const [filter, setFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  // Handle input changes for new items
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  // Add a new item to the inventory
  const addItem = () => {
    if (newItem.name && newItem.category && newItem.quantity) {
      setInventory([
        ...inventory,
        { id: Date.now(), name: newItem.name, category: newItem.category, quantity: parseInt(newItem.quantity) },
      ]);
      setNewItem({ name: "", category: "", quantity: "" });
    }
  };

  // Edit an item
  const editItem = (id) => {
    const updatedName = prompt("Enter new name:");
    const updatedCategory = prompt("Enter new category:");
    const updatedQuantity = prompt("Enter new quantity:");
    setInventory(
      inventory.map((item) =>
        item.id === id
          ? {
              ...item,
              name: updatedName || item.name,
              category: updatedCategory || item.category,
              quantity: updatedQuantity ? parseInt(updatedQuantity) : item.quantity,
            }
          : item
      )
    );
  };

  // Delete an item
  const deleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  // Sort items by quantity
  const sortItems = () => {
    setSortAsc(!sortAsc);
    setInventory(
      [...inventory].sort((a, b) => (sortAsc ? a.quantity - b.quantity : b.quantity - a.quantity))
    );
  };

  // Filter items by category
  const filteredInventory = filter
    ? inventory.filter((item) => item.category.toLowerCase().includes(filter.toLowerCase()))
    : inventory;

  return (
    <div className="app">
      <h1>Inventory Management</h1>

      {/* Add Item Section */}
      <div className="add-item">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={newItem.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newItem.category}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={handleInputChange}
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      {/* Filter and Sort Section */}
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by category"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={sortItems}>Sort by Quantity</button>
      </div>

      {/* Inventory Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item) => (
            <tr key={item.id} className={item.quantity < 10 ? "low-stock" : ""}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => editItem(item.id)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryApp;

