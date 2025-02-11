import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("Publish");
  const navigate = useNavigate();

  const getPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8008/article/list/100/0");
      setPosts(res.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const filteredPosts = posts.filter((post) => post.status === activeTab);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8008/article/${id}`, {
        status: "Trash",
      });
      if (res.status === 200) {
        setPosts(
          posts.map((post) =>
            post.id === id ? { ...post, status: "Trash" } : post
          )
        );
      }
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        All Posts
      </h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        {["Publish", "Draft", "Trash"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-md transition-all cursor-pointer ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Add New and Preview Article*/}

      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition-all"
          onClick={() => navigate("/add")}
        >
          ➕ Add New
        </button>

        <button
          className="px-4 py-2 bg-blue-400 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition-all"
          onClick={() => navigate("/preview")}
        >
          Preview Articles
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-100 transition-all">
                  <td className="p-2">{post.title}</td>
                  <td className="p-2">{post.category}</td>
                  <td className="p-3 flex justify-center space-x-2">
                    <button
                      onClick={() => navigate(`/edit/${post.id}`)}
                      className="bg-yellow-200 px-4 py-2 rounded-xl shadow-md text-white hover:bg-yellow-400 transition-all"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-400 px-4 py-2 rounded-xl shadow-md text-white hover:bg-red-600 transition-all"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 py-4">
                  Tidak ada artikel dalam kategori ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
