import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import Navbar from "../components/Navbar";

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
  "Other",
];

const ListDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  const [list, setList] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const [itemForm, setItemForm] = useState({
    itemName: "",
    quantity: "",
    category: itemCategories[0],
    notes: "",
    imageFile: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !user) return;
    fetch(`http://localhost:5000/shoppingLists/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.userId !== user.id) {
          alert("You cannot view this list");
          navigate("/home");
          return;
        }
        setList(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, user, navigate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

  const handleAddOrEditItem = async () => {
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

    // Name to uppercase
    const formattedName = itemForm.itemName.toUpperCase();

    let updatedItems;

    if (editingItemId) {
      // Edit existing item
      updatedItems = list.items.map((i: any) =>
        i.id === editingItemId
          ? {
              ...i,
              itemName: formattedName,
              quantity: itemForm.quantity,
              category: itemForm.category,
              notes: itemForm.notes,
              image: imageBase64 || i.image,
            }
          : i
      );
    } else {
      // Add new item
      const newItem = {
        id: Date.now(),
        itemName: formattedName,
        quantity: itemForm.quantity,
        category: itemForm.category,
        notes: itemForm.notes,
        image: imageBase64,
      };
      updatedItems = [...list.items, newItem];
    }

    const updatedList = { ...list, items: updatedItems };

    await fetch(`http://localhost:5000/shoppingLists/${list.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });

    setList(updatedList);
    setItemForm({
      itemName: "",
      quantity: "",
      category: itemCategories[0],
      notes: "",
      imageFile: null,
    });
    setImagePreview(null);
    setEditingItemId(null);
  };

  const handleDeleteItem = async (itemId: number) => {
    const updatedList = {
      ...list,
      items: list.items.filter((i: any) => i.id !== itemId),
    };
    await fetch(`http://localhost:5000/shoppingLists/${list.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });
    setList(updatedList);
  };

  const handleEditClick = (item: any) => {
    setItemForm({
      itemName: item.itemName,
      quantity: item.quantity,
      category: item.category,
      notes: item.notes,
      imageFile: null,
    });
    setImagePreview(item.image || null);
    setEditingItemId(item.id);
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;
  if (!list)
    return <p className="text-center mt-10 text-red-500">List not found.</p>;

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="absolute inset-0 bg-[url('/5.png')] bg-cover bg-center filter blur-[6px]"></div>
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 p-8 max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/home")}
          className="mb-6 bg-black/50 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition"
        >
          ← Back
        </button>

        <div className="backdrop-blur-[20px] bg-white/10 p-8 rounded-2xl shadow-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {list.name} 📝
          </h1>

          {/* Add/Edit Item Form */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingItemId ? "Edit Item" : "Add New Item"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="itemName"
                value={itemForm.itemName}
                onChange={handleChange}
                placeholder="Item Name"
                className="p-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                name="quantity"
                value={itemForm.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="p-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <select
                name="category"
                value={itemForm.category}
                onChange={handleChange}
                className="p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-white"
              >
                {itemCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <label className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-white hover:text-black text-center transition">
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
                className="p-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white md:col-span-2"
              />
            </div>

            {imagePreview && (
              <div className="mt-3">
                <p className="text-sm text-gray-300">Preview:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded border border-gray-400"
                />
              </div>
            )}

            <button
              onClick={handleAddOrEditItem}
              className={`mt-6 ${
                editingItemId
                  ? "bg-black hover:bg-green-600"
                  : "bg-black hover:bg-green-700"
              } text-white px-4 py-2 rounded-lg transition`}
            >
              {editingItemId ? "Update Item" : "Add Item"}
            </button>
          </div>

          {/* List Items */}
          <h2 className="text-xl font-semibold mb-3">Items in List</h2>
          {list.items.length === 0 ? (
            <p className="text-gray-400">No items yet.</p>
          ) : (
            <ul className="space-y-3">
              {list.items.map((item: any) => (
                <li
                  key={item.id}
                  className="bg-white/10 p-4 rounded-lg flex justify-between items-center backdrop-blur-sm"
                >
                  <div>
                    <h3 className="font-semibold text-white">
                      {item.itemName}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Qty: {item.quantity} | Category: {item.category}
                    </p>
                    {item.notes && (
                      <p className="text-gray-400 text-sm">
                        Notes: {item.notes}
                      </p>
                    )}
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.itemName}
                        className="w-20 h-20 object-cover rounded mt-2 border border-gray-500"
                      />
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="px-3 py-1 rounded "
                    >
                       <img
                        src="/edit.png"
                        alt="edit"
                        className="w-6 h-6 cursor-pointer" 
                      />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className=" rounded flex items-center justify-center "
                    >
                      <img
                        src="/bin.png"
                        alt="delete"
                        className="w-6 h-6 cursor-pointer" 
                      />
                    </button>
                      
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListDetailsPage;
