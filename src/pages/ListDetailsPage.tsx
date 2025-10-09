import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Item {
  id: number;
  itemName: string;
  quantity: string;
  category: string;
}

interface ShoppingList {
  id: number;
  name: string;
  items: Item[];
}

const ListDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState<ShoppingList | null>(null);
  const [newItem, setNewItem] = useState({ itemName: "", quantity: "", category: "" });
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editItemData, setEditItemData] = useState({ itemName: "", quantity: "", category: "" });
  const [loading, setLoading] = useState(true);

  // Fetch list by ID
  useEffect(() => {
    fetch(`http://localhost:5000/shoppingLists/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.items) data.items = [];
        setList(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error loading list:", err));
  }, [id]);

  // Add new item
  const handleAddItem = async () => {
    if (!list || !newItem.itemName.trim()) return;

    const updatedList = {
      ...list,
      items: [...list.items, { id: Date.now(), ...newItem }],
    };

    await fetch(`http://localhost:5000/shoppingLists/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });

    setList(updatedList);
    setNewItem({ itemName: "", quantity: "", category: "" });
  };

  // Delete item
  const handleDeleteItem = async (itemId: number) => {
    if (!list) return;

    const updatedList = {
      ...list,
      items: list.items.filter((item) => item.id !== itemId),
    };

    await fetch(`http://localhost:5000/shoppingLists/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });

    setList(updatedList);
  };

  // Start editing
  const startEditItem = (item: Item) => {
    setEditingItemId(item.id);
    setEditItemData({ itemName: item.itemName, quantity: item.quantity, category: item.category });
  };

  // Save edited item
  const handleSaveEdit = async () => {
    if (!list || editingItemId === null) return;

    const updatedList = {
      ...list,
      items: list.items.map((item) =>
        item.id === editingItemId ? { id: item.id, ...editItemData } : item
      ),
    };

    await fetch(`http://localhost:5000/shoppingLists/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });

    setList(updatedList);
    setEditingItemId(null);
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!list) return <p className="p-6">List not found.</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <button
        onClick={() => navigate("/")}
        className="mb-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4">{list.name}</h1>

      {/* Add new item */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Add Item</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Item name"
            value={newItem.itemName}
            onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
            className="border p-2 rounded flex-1"
          />
          <input
            type="text"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            className="border p-2 rounded flex-1"
          />
          <input
            type="text"
            placeholder="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={handleAddItem}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>
      </div>

      {/* List of items */}
      <div className="space-y-3">
        {list.items.length === 0 ? (
          <p>No items yet in this list.</p>
        ) : (
          list.items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              {editingItemId === item.id ? (
                <div className="flex flex-col sm:flex-row gap-2 flex-1">
                  <input
                    value={editItemData.itemName}
                    onChange={(e) => setEditItemData({ ...editItemData, itemName: e.target.value })}
                    className="border p-2 rounded flex-1"
                  />
                  <input
                    value={editItemData.quantity}
                    onChange={(e) => setEditItemData({ ...editItemData, quantity: e.target.value })}
                    className="border p-2 rounded flex-1"
                  />
                  <input
                    value={editItemData.category}
                    onChange={(e) => setEditItemData({ ...editItemData, category: e.target.value })}
                    className="border p-2 rounded flex-1"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <p className="font-medium">{item.itemName}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} • {item.category}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditItem(item)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListDetailsPage;
