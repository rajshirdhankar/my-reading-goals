import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/BookCard";
import { getBooksFromStorage } from "@/lib/storage";

export const HomeRoute = () => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedBooks = getBooksFromStorage();
    setBooks(storedBooks);
  }, []);

  const toggleReadStatus = (id) => {
    const updatedBooks = books.map(book => 
      book.id === id ? { ...book, isRead: !book.isRead } : book
    );
    setBooks(updatedBooks);
    localStorage.setItem('readingGoals_books', JSON.stringify(updatedBooks));
  };

  const filteredBooks = books.filter(book => {
    if (filter === "read") return book.isRead;
    if (filter === "unread") return !book.isRead;
    if (searchTerm) {
      return book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
             book.author.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Reading Goals</h1>
            <p className="text-gray-500 text-sm">Track your reading progress</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm bg-white px-3 py-1.5 rounded-lg shadow-sm">
              {new Date().toLocaleDateString('en-GB', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })}
            </div>
            <Link to="/add">
              <Button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 shadow-sm">
                + Add Book
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search books..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute right-3 top-3 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filter === "all" ? "default" : "outline"} 
                onClick={() => setFilter("all")}
                className="px-4 py-2.5"
              >
                All
              </Button>
              <Button 
                variant={filter === "read" ? "default" : "outline"} 
                onClick={() => setFilter("read")}
                className="px-4 py-2.5"
              >
                Read
              </Button>
              <Button 
                variant={filter === "unread" ? "default" : "outline"} 
                onClick={() => setFilter("unread")}
                className="px-4 py-2.5"
              >
                Unread
              </Button>
            </div>
          </div>
        </div>

        {/* Books List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 px-2">
            {filter === "all" ? "All Books" : filter === "read" ? "Completed Books" : "Books to Read"}
            <span className="text-gray-500 ml-2 text-sm font-normal">
              ({filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'})
            </span>
          </h2>

          {filteredBooks.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <p className="text-gray-500 mb-4">
                {books.length === 0 ? 'Your reading list is empty' : 'No books match your search'}
              </p>
              <Link to="/add">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Add Your First Book
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBooks.map(book => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onToggleRead={toggleReadStatus} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};