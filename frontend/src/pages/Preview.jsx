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
    <div className="container mx-auto px-auto md:px-24 p-4">
      <div className="flex justify-center items-center mb-8">
        <button
          onClick={() => navigate("/")}
          className="absolute left-0 ml-4 mt-1 bg-gray-300 px-4 py-2 rounded-xl"
        >
          Back to home
        </button>
        <h1 className="text-2xl font-bold text-center">Published Articles</h1>
      </div>

      {currentArticles.length === 0 ? (
        <p className="text-center">Tidak ada article yang dipublish.</p>
      ) : (
        currentArticles.map((article) => (
          <div key={article.id} className="border-b pb-4 mb-4">
            <h2 className="text-xl font-bold">{article.title}</h2>
            <p className="text-gray-800">Category: {article.category}</p>
            <p className="mt-2">{article.content.substring(0, 800)}...</p>
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
              className={`px-3 py-1 mx-1 border rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-300"
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
