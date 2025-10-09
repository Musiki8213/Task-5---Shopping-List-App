import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { setLists, addList, deleteList } from "../redux/listSlice";
import { logout } from "../redux/userSlice";

// Categories for shopping lists
const categories = [
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

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lists = useSelector((state: RootState) => state.lists.lists);
  const user = useSelector((state: RootState) => state.user.user);

  // Form state includes name + category
  const [form, setForm] = useState({ name: "", category: categories[0] });

  // Fetch current user's lists
  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:5000/shoppingLists?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => dispatch(setLists(data)));
  }, [dispatch, user]);

  // Update form state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add a new list
  const handleAddList = async () => {
    if (!form.name) {
      alert("List name required");
      return;
    }

    const newList = {
      userId: user!.id,
      name: form.name,
      category: form.category,
      dateAdded: new Date().toISOString(),
      items: [],
    };

    const res = await fetch("http://localhost:5000/shoppingLists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newList),
    });

    const savedList = await res.json();
    dispatch(addList(savedList));
    setForm({ name: "", category: categories[0] });
  };

  // Delete a list
  const handleDeleteList = async (id: number) => {
    await fetch(`http://localhost:5000/shoppingLists/${id}`, { method: "DELETE" });
    dispatch(deleteList(id));
  };

  // Logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) navigate("/login");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🛒 {user?.name}'s Shopping Lists</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Add New List Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Add New List</h2>
        <div className="flex gap-2 flex-wrap">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="List Name"
            className="border p-2 flex-1 rounded min-w-[150px]"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded min-w-[150px]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddList}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            ➕ Add List
          </button>
        </div>
      </div>

      {/* Display Lists */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">Your Lists</h2>
        {lists.length === 0 ? (
          <p className="text-gray-500">No lists yet.</p>
        ) : (
          <ul className="space-y-3">
            {lists.map((list) => (
              <li
                key={list.id}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <span className="font-semibold text-lg">{list.name}</span>{" "}
                  <span className="text-gray-500 text-sm">({list.category})</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/list/${list.id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteList(list.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
