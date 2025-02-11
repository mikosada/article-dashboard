import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Preview() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get("http://localhost:8008/article/list/100/0"); //Get semua article
        const publishedArticle = res.data.filter(
          (article) => article.status === "Publish"
        );
        setArticles(publishedArticle);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchArticle();
  }, []);

  //Pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  //Function untuk mengganti halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-start">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-400 text-white px-4 py-2 rounded-xl"
        >
          Back to home
        </button>
      </div>
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Published Articles
        </h1>
      </div>

      {currentArticles.length === 0 ? (
        <p className="text-center text-gray-500">
          Tidak ada article yang dipublish.
        </p>
      ) : (
        currentArticles.map((article) => (
          <div
            key={article.id}
            className="border border-gray-300 p-5 rounded-lg shadow-md mb-6 hover:shadow-lg transition-all"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {article.title}
            </h2>
            <p className="text-gray-600 italic">Category: {article.category}</p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              {article.content.substring(0, 800)}...
            </p>
          </div>
        ))
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(articles.length / articlesPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 mx-1 rounded-md font-medium transition-all ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Preview;
