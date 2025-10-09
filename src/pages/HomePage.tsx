import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { setLists, addList, deleteList } from "../redux/listSlice";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state: RootState) => state.lists.lists);
  const [newList, setNewList] = useState("");
  const navigate = useNavigate();

  // Fetch lists from JSON Server
  useEffect(() => {
    fetch("http://localhost:5000/shoppingLists")
      .then((res) => res.json())
      .then((data) => dispatch(setLists(data)));
  }, [dispatch]);

  // Add new shopping list
  const handleAdd = async () => {
    if (!newList.trim()) return;

    const list = { id: Date.now(), name: newList, items: [] };

    await fetch("http://localhost:5000/shoppingLists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(list),
    });

    dispatch(addList(list));
    setNewList("");
  };

  // Delete shopping list
  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:5000/shoppingLists/${id}`, { method: "DELETE" });
    dispatch(deleteList(id));
  };

  // Logout user
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // View single list
  const handleView = (id: number) => {
    navigate(`/list/${id}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Shopping Lists</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Add new list */}
      <div className="flex gap-2 mb-6">
        <input
          value={newList}
          onChange={(e) => setNewList(e.target.value)}
          placeholder="Enter list name..."
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add
        </button>
      </div>

      {/* List display */}
      <ul className="space-y-3">
        {lists.map((list) => (
          <li
            key={list.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <span className="font-medium">{list.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleView(list.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                View
              </button>
              <button
                onClick={() => handleDelete(list.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
