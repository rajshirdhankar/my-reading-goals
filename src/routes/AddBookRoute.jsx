import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getBooksFromStorage, saveBooksToStorage } from "@/lib/storage"

export const AddBookRoute = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!title.trim() || !author.trim()) {
      setError("Both title and author are required")
      return
    }

    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      isRead: false,
    }

    const currentBooks = getBooksFromStorage()
    const updatedBooks = [...currentBooks, newBook]
    saveBooksToStorage(updatedBooks)
    
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        {/* Header with Date */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Add New Book</h1>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-GB', { 
              weekday: 'short', 
              day: '2-digit', 
              month: 'short', 
              year: 'numeric' 
            })}
          </div>
        </div>

        {/* Search Bar (if needed) */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
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

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-700 font-medium">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter book title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author" className="text-gray-700 font-medium">
                Author
              </Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/")}
                type="button"
                className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add Book
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}