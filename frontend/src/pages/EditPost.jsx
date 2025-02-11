import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [prevData, setPrevData] = useState({});
  const [errors, setErrors] = useState({});

  //Fetch article berdasarkan ID
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:8008/article/${id}`);
        const { title, content, category, status } = res.data;
        setTitle(title);
        setContent(content);
        setCategory(category);
        setStatus(status);
        setPrevData({ title, content, category, status });
      } catch (error) {
        console.error("Error: ", error);
        alert("Article tidak ditemukan");
        navigate("/");
      }
    };

    fetchArticle();
  }, [id]);

  // Validasi
  const validateForm = () => {
    let errors = {};
    if (title.length < 20) errors.title = "Judul minimal 20 karakter";
    if (content.length < 200) errors.content = "Konten minimal 200 karakter";
    if (category.length < 3) errors.category = "Kategori minimal 3 karakter";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  //Function untuk update article
  const handleUpdate = async (e) => {
    e.preventDefault();

    //Validasi
    if (!validateForm()) {
      return;
    }

    //Jika tidak ada perubahan yang dilakukan
    if (
      title === prevData.title &&
      content === prevData.content &&
      category === prevData.category &&
      status === prevData.status
    ) {
      alert("Tidak ada perubahan data article");
      navigate("/");
      return;
    }

    try {
      await axios.put(`http://localhost:8008/article/${id}`, {
        title,
        content,
        category,
        status,
      });
      alert("Article berhasil diupdate!");
      navigate("/");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 md:mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Edit Article
      </h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
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
          ></textarea>
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
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
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition-all"
          >
            Publish
          </button>
          <button
            type="submit"
            onClick={() => setStatus("Draft")}
            className="px-6 py-3 bg-gray-500 text-white font-medium rounded-md shadow-md hover:bg-gray-600 transition-all"
          >
            Draft
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
