import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { setLists, addList, deleteList } from "../redux/listSlice";
import Navbar from "../components/Navbar";

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

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:5000/shoppingLists?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => dispatch(setLists(data)));
  }, [dispatch, user]);

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

    const savedList = await res.json();
    dispatch(addList(savedList));
    setForm({ name: "", category: categories[0] });
  };

  const handleDeleteList = async (id: number) => {
    await fetch(`http://localhost:5000/shoppingLists/${id}`, { method: "DELETE" });
    dispatch(deleteList(id));
  };

  if (!user) navigate("/login");

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <Navbar />

      {/* Background and overlay */}
      <div className="absolute inset-0 bg-[url('/5.png')] bg-cover bg-center filter blur-[6px]"></div>
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
           {user?.name}'s Shopping Lists
          </h1>
        </div>

        {/* Add New List */}
        <div className="backdrop-blur-[20px] bg-white/10 p-6 rounded-2xl shadow-2xl mb-10">
          <h2 className="text-xl font-semibold mb-4">Add New List</h2>
          <div className="flex flex-wrap gap-3">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="List Name"
              className="p-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white flex-1 min-w-[150px]"
            />
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-white min-w-[150px] cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddList}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
            >
               Add List
            </button>
          </div>
        </div>

        {/* Lists Display */}
        <div className="backdrop-blur-[20px] bg-white/10 p-6 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4">Your Lists</h2>

          {lists.length === 0 ? (
            <p className="text-gray-400">No lists yet.</p>
          ) : (
            <ul className="space-y-4">
              {lists.map((list) => (
                <li
                  key={list.id}
                  className="bg-white/10 p-4 rounded-lg flex justify-between items-center backdrop-blur-sm"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white">{list.name}</h3>
                    <p className="text-gray-300 text-sm">{list.category}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/list/${list.id}`)}
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
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
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
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
