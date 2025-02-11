import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Draft");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length < 20 || content.length < 200 || category.length < 3) {
      alert("Validasi gagal! Pastikan semua input memenuhi syarat.");
      return;
    }

    try {
      await axios.post("http://localhost:8008/article/", {
        title,
        content,
        category,
        status,
      });

      alert("Artikel berhasil dibuat");
      navigate("/");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add New Article</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2"
            placeholder="Enter at least 20 characters"
          />
        </div>

        <div>
          <label className="block font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-2 h-32"
            placeholder="Enter at least 200 characters"
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2"
            placeholder="Enter at least 3 characters"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            onClick={() => setStatus("Publish")}
            className="px-4 py-2 bg-blue-600 text-white"
          >
            Publish
          </button>
          <button
            type="submit"
            onClick={() => setStatus("Draft")}
            className="px-4 py-2 bg-gray-400 text-white"
          >
            Draft
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
