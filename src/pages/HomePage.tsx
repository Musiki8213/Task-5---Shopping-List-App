/**
 * HomePage — Lists all shopping lists for the current user. Fetches from JSON Server (localhost:5000/shoppingLists).
 */
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { setLists } from "../redux/listSlice";
import Navbar from "../components/Navbar";

/** Available list categories for new lists */
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

  const [form, setForm] = useState({ name: "", category: categories[0] });

  const fetchLists = useCallback(() => {
    if (!user) return;
    fetch(`http://localhost:5000/shoppingLists?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => dispatch(setLists(Array.isArray(data) ? data : [])));
  }, [dispatch, user]);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

    if (!res.ok) return;
    setForm({ name: "", category: categories[0] });
    // Re-fetch from server so all lists show (avoids id/format mismatch and ensures full list)
    fetchLists();
  };

  const handleDeleteList = async (id: number | string) => {
    await fetch(`http://localhost:5000/shoppingLists/${id}`, { method: "DELETE" });
    fetchLists();
  };

  if (!user) navigate("/login");

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <Navbar />

      {/* Background and overlay */}
      <div className="absolute inset-0 bg-[url('/5.png')] bg-cover bg-center filter blur-[6px]"></div>
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-2xl md:max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">
           {user?.name}'s Shopping Lists
          </h1>
        </div>

        {/* Add New List */}
        <div className="backdrop-blur-[20px] bg-white/10 p-4 sm:p-6 rounded-2xl shadow-2xl mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Add New List</h2>
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="List Name"
              className="p-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white flex-1 min-w-[150px] text-sm sm:text-base"
            />
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-white min-w-[150px] cursor-pointer text-sm sm:text-base"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddList}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer text-sm sm:text-base whitespace-nowrap"
            >
               Add List
            </button>
          </div>
        </div>

        {/* Lists Display — scrollable so all lists are visible */}
        <div className="backdrop-blur-[20px] bg-white/10 p-4 sm:p-6 rounded-2xl shadow-2xl">
          <h2 className="text-lg sm:text-2xl font-semibold mb-4">Your Lists</h2>

          {lists.length === 0 ? (
            <p className="text-gray-400">No lists yet.</p>
          ) : (
            <ul className="space-y-3 sm:space-y-4 max-h-[50vh] overflow-y-auto pr-1">
              {lists.map((list) => (
                <li
                  key={String(list.id)}
                  className="bg-white/10 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 backdrop-blur-sm"
                >
                  <div className="w-full sm:w-auto">
                    <h3 className="text-base sm:text-lg font-semibold text-white">{list.name}</h3>
                    <p className="text-gray-300 text-sm">{list.category}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => navigate(`/list/${list.id}`)}
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer text-sm sm:text-base"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteList(list.id)}
                      className="py-1 rounded-lg"
                    >
                       <img
                        src="/bin.png"
                        alt="delete"
                        className="w-6 h-6 cursor-pointer" 
                      />
                    </button>
                    <button
                      onClick={() => {
                        const shareURL = `${window.location.origin}/list/${list.id}?shared=true`;
                        navigator.clipboard.writeText(shareURL).then(() => {
                          alert("Shareable list link copied to clipboard!");
                        });
                      }}
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer text-sm sm:text-base"
                    >
                      Share
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

export default HomePage;
