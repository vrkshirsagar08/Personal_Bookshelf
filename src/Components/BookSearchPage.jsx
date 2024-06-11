import React from 'react';

const BookSearchPage = ({
  searchTerm,
  setSearchTerm,
  searchResults,
  addToBookshelf,
}) => {
  return (
    <div className="book-search-page">
      <h2>Book Search</h2>
      <input
        type="text"
        placeholder="Search for a book"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="search-results">
        {searchResults.map((book) => (
          <div key={book.key} className="book-card">
            <h3>{book.title}</h3>
            <p>Author(s): {book.author_name ? book.author_name.join(', ') : 'N/A'}</p>
            <p>Edition Count: {book.edition_count}</p>
            <button onClick={() => addToBookshelf(book)}>
              Add to Bookshelf
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSearchPage;