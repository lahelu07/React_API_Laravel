import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface Article {
  id: number;
  title: string;
  author: string;
  content: string;
  email: string;
}

function Form({
  article,
  onSubmit,
  isEditing,
}: {
  article: Article;
  onSubmit: (data: Article) => void;
  isEditing: boolean;
}) {
  const [id, setId] = useState(article.id);
  const [title, setTitle] = useState(article.title);
  const [author, setAuthor] = useState(article.author);
  const [content, setContent] = useState(article.content);
  const [email, setEmail] = useState(article.email);

  useEffect(() => {
    setId(article.id);
    setTitle(article.title);
    setAuthor(article.author);
    setContent(article.content);
    setEmail(article.email);
  }, [article]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id, title, author, content, email });
  };

  return (
    <div className="gap-4 mx-auto container">
      <form
        onSubmit={handleSubmit}
        className="col-span-3 bg-white rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="id"
            >
              ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="id"
              type="number"
              value={id}
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Input your title"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="author"
            >
              Author
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Input name author"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Input email"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Input content article"
          />
        </div>
        <div className="flex items-center justify-between">
          <Button type="submit" variant="outline">
            {isEditing ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Form;
