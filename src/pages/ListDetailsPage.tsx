import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const itemCategories = [
  "Grocery",
  "Dairy",
  "Electronics",
  "Stationery",
  "Clothing",
  "Bakery",
  "Beverages",
  "Household",
  "Health & Beauty",
  "Other"
];

const ListDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  const [list, setList] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [itemForm, setItemForm] = useState({
    itemName: "",
    quantity: "",
    category: itemCategories[0],
    notes: "",
    imageFile: null as File | null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch the list from JSON Server
  useEffect(() => {
    if (!id || !user) return;
    fetch(`http://localhost:5000/shoppingLists/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.userId !== user.id) {
          alert("❌ You cannot view this list");
          navigate("/home");
          return;
        }
        setList(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, user, navigate]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "file") {
      const file = target.files?.[0] || null;
      setItemForm({ ...itemForm, imageFile: file });

      if (file) {
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setItemForm({ ...itemForm, [target.name]: target.value });
    }
  };

  // Add new item to the list
  const handleAddItem = async () => {
    if (!itemForm.itemName || !itemForm.quantity || !itemForm.category) {
      alert("Please fill required fields for the item");
      return;
    }

    let imageBase64 = "";
    if (itemForm.imageFile) {
      imageBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(itemForm.imageFile!);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    }

    const newItem = {
      id: Date.now(),
      itemName: itemForm.itemName,
      quantity: itemForm.quantity,
      category: itemForm.category,
      notes: itemForm.notes,
      image: imageBase64
    };

    const updatedList = { ...list, items: [...list.items, newItem] };

    await fetch(`http://localhost:5000/shoppingLists/${list.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });

    setList(updatedList);
    setItemForm({ itemName: "", quantity: "", category: itemCategories[0], notes: "", imageFile: null });
    setImagePreview(null);
  };

  // Delete item from the list
  const handleDeleteItem = async (itemId: number) => {
    const updatedList = { ...list, items: list.items.filter((i: any) => i.id !== itemId) };
    await fetch(`http://localhost:5000/shoppingLists/${list.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });
    setList(updatedList);
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (!list) return <p className="text-center mt-10 text-red-500">List not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate("/home")}
        className="mb-4 bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
      >
        ← Back
      </button>

      <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{list.name} 📝</h1>

        {/* Add New Item Form */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Add New Item</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="itemName"
              value={itemForm.itemName}
              onChange={handleChange}
              placeholder="Item Name"
              className="border p-2 rounded"
            />
            <input
              name="quantity"
              value={itemForm.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="border p-2 rounded"
            />
            <select
              name="category"
              value={itemForm.category}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              {itemCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Styled file input button */}
            <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 text-center">
              📁 Choose Image
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>

            <textarea
              name="notes"
              value={itemForm.notes}
              onChange={handleChange}
              placeholder="Notes"
              className="border p-2 rounded md:col-span-2"
            />
          </div>

          {/* Live Image Preview */}
          {imagePreview && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded border"
              />
            </div>
          )}

          <button
            onClick={handleAddItem}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            ➕ Add Item
          </button>
        </div>

        {/* List Items */}
        <h2 className="text-xl font-semibold mb-3">Items in List</h2>
        {list.items.length === 0 ? (
          <p className="text-gray-500">No items yet.</p>
        ) : (
          <ul className="space-y-3">
            {list.items.map((item: any) => (
              <li
                key={item.id}
                className="bg-gray-50 p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{item.itemName}</h3>
                  <p className="text-gray-600 text-sm">
                    Qty: {item.quantity} | Category: {item.category}
                  </p>
                  {item.notes && <p className="text-gray-500 text-sm">Notes: {item.notes}</p>}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.itemName}
                      className="w-20 h-20 object-cover rounded mt-2"
                    />
                  )}
                </div>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListDetailsPage;
