export function getBooksFromStorage() {
  const books = localStorage.getItem('books');
  return books ? JSON.parse(books) : [];
}

export function saveBooksToStorage(books) {
  localStorage.setItem('books', JSON.stringify(books));
}
