import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Draft");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    if (title.length < 20) errors.title = "Judul minimal 20 karakter";
    if (content.length < 200) errors.content = "Konten minimal 200 karakter";
    if (category.length < 3) errors.category = "Kategori minimal 3 karakter";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
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
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Add New Article
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full border p-3 rounded-md focus:outline-none ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter at least 20 characters"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`w-full border p-3 rounded-md h-40 focus:outline-none ${
              errors.content ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter at least 200 characters"
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full border p-3 rounded-md focus:outline-none ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter at least 3 characters"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            onClick={() => setStatus("Publish")}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Publish
          </button>
          <button
            type="submit"
            onClick={() => setStatus("Draft")}
            className="px-6 py-3 bg-gray-500 text-white font-medium rounded-lg shadow-md hover:bg-gray-600 transition-all"
          >
            Draft
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
