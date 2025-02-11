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

  //Function untuk update article
  const handleUpdate = async (e) => {
    e.preventDefault();

    //Validasi
    if (title.length < 20 || content.length < 200 || category.length < 3) {
      alert("Validasi gagal! Pastikan input sesuai dengan ketentuan");
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

  //Function untuk mengubah status dan submit
  // const handleStatusUpdateAndSubmit = async (newStatus) => {
  //   setStatus(newStatus);
  //   await handleUpdate();
  // };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Edit Article</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
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
          ></textarea>
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
            className="px-4 py-2 bg-blue-500 text-white"
          >
            Publish
          </button>
          <button
            type="submit"
            onClick={() => setStatus("Draft")}
            className="px-4 py-2 bg-gray-500 text-white"
          >
            Draft
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
