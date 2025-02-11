import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("Publish");
  const navigate = useNavigate();

  const getPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8008/article/list/5/0");
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
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">All Posts</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        {["Publish", "Draft", "Trash"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Add New Article */}

      <div className="">
        <button
          className="px-4 py-2 bg-green-400 text-white mb-4"
          onClick={() => navigate("/add")}
        >
          ➕ Add New
        </button>

        <button
          className="px-4 py-2 bg-blue-400 text-white mb-4"
          onClick={() => navigate("/preview")}
        >
          Preview Articles
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td className="border p-2">{post.title}</td>
              <td className="border p-2">{post.category}</td>
              <td className="border p-2">
                <button
                  onClick={() => navigate(`/edit/${post.id}`)}
                  className="bg-yellow-200 px-4 py-2 text-white"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-400 px-4 py-2 text-white ml-2"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
