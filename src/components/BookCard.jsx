import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export const BookCard = ({ book, onToggleRead }) => {
  return (
    <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium line-clamp-1">{book.title}</CardTitle>
        <CardDescription className="text-gray-600 line-clamp-1">{book.author}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3 flex-grow">
        <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
          book.isRead 
            ? "bg-green-100 text-green-800" 
            : "bg-yellow-100 text-yellow-800"
        }`}>
          {book.isRead ? "Completed" : "To Read"}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onToggleRead(book.id)}
          variant={book.isRead ? "outline" : "default"}
          className="w-full"
        >
          {book.isRead ? "Mark Unread" : "Mark as Read"}
        </Button>
      </CardFooter>
    </Card>
  );
};