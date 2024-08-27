import { useState, useEffect } from "react";
import Navbar from "./wadah/Navbar";
import axios from "axios";
import Tabel from "./wadah/Tabel";
import Form from "./wadah/Form";

interface Article {
  id: number;
  title: string;
  author: string;
  content: string;
  email: string;
}

function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const url = "http://127.0.0.1:8000/api/article";

  const getArticle = async (page: number = 1, size: number = 5) => {
    const response = await axios.get(url, {
      params: {
        page: page,
        pageSize: size,
      },
    });
    setArticles(response.data.data); // Adjust based on how your API returns data
    setTotalPages(response.data.last_page); // Set total pages from API response
  };

  const onDelete = (id: number) => {
    axios.delete(`${url}/${id}`).then(() => {
      getArticle(pageIndex, pageSize);
    });
  };

  const onEdit = (data: Article) => {
    setCurrentArticle(data);
  };

  const onSubmit = async (data: Article) => {
    if (currentArticle) {
      await axios.put(`${url}/${data.id}`, data);
    } else {
      await axios.post(url, data);
    }
    setCurrentArticle(null); // Reset form to "Submit" mode
    getArticle(pageIndex, pageSize);
  };

  useEffect(() => {
    getArticle(pageIndex, pageSize);
  }, [pageIndex, pageSize]);

  const nextId =
    articles.length > 0 ? Math.max(...articles.map((art) => art.id)) + 1 : 1;

  return (
    <>
      <Navbar />
      <Form
        article={
          currentArticle || {
            id: nextId,
            title: "",
            author: "",
            content: "",
            email: "",
          }
        }
        onSubmit={onSubmit}
        isEditing={currentArticle !== null}
      />
      <Tabel
        article={articles}
        onDelete={onDelete}
        onEdit={onEdit}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={totalPages}
      />
    </>
  );
}

export default Home;
