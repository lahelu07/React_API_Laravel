import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Article {
  id: number;
  title: string;
  author: string;
  content: string;
  email: string;
}

function Trash() {
  const [deletedArticles, setDeletedArticles] = useState<Article[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const url = "http://127.0.0.1:8000/api/article/trash";

  useEffect(() => {
    const fetchDeletedArticles = async () => {
      try {
        const response = await axios.get(url);
        setDeletedArticles(response.data);
        setTotalPages(Math.ceil(response.data.length / pageSize));
      } catch (error) {
        console.error("Error fetching deleted articles:", error);
      }
    };

    fetchDeletedArticles();
  }, [pageSize]);

  // Filter and paginate articles based on search term and pagination
  const filteredArticles = deletedArticles.filter(
    (arti) =>
      arti.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arti.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arti.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arti.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedArticles = filteredArticles.slice(
    (pageIndex - 1) * pageSize,
    pageIndex * pageSize
  );

  // Fungsi untuk restore artikel
  const restoreArticle = async (id: number) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/article/${id}/restore`);
      setDeletedArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== id)
      );
    } catch (error) {
      console.error("Error restoring article:", error);
    }
  };

  // Fungsi untuk menghapus artikel secara permanen
  const deletePermanently = async (id: number) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/article/${id}/force-delete`
      );
      setDeletedArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== id)
      );
    } catch (error) {
      console.error("Error deleting article permanently:", error);
    }
  };

  return (
    <section className="mx-auto container">
      <div className="w-24">
        <Button variant="outline" size="icon" onClick={() => navigate("/home")}>
          Back
        </Button>
      </div>

      <section id="search-bar" className="py-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </section>

      <section id="tabel">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedArticles.length > 0 ? (
              paginatedArticles.map((arti: Article) => (
                <TableRow key={arti.id}>
                  <TableCell>{arti.id}</TableCell>
                  <TableCell>{arti.title}</TableCell>
                  <TableCell>{arti.author}</TableCell>
                  <TableCell>{arti.content}</TableCell>
                  <TableCell>{arti.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => restoreArticle(arti.id)}
                      className="bg-blue-600 text-white"
                    >
                      Restore
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => deletePermanently(arti.id)}
                      className="bg-red-600 text-white"
                    >
                      Delete Permanently
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>No deleted articles found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>

      <section
        id="pagination"
        className="py-4 flex items-center justify-between"
      >
        <div>
          <label htmlFor="pageSize" className="mr-2 font-medium">
            Show entries:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageIndex(1);
            }}
            className="p-2 border rounded font-medium"
          >
            {[5, 10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <Button
            variant="outline"
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 1}
          >
            Previous
          </Button>
          <span className="mx-2">
            Page <strong>{pageIndex}</strong> of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex === totalPages}
          >
            Next
          </Button>
        </div>
      </section>
    </section>
  );
}

export default Trash;
