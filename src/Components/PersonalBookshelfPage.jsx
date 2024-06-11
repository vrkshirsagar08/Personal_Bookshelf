import React from 'react';

const PersonalBookshelfPage = ({ bookshelf, removeFromBookshelf }) => {
  return (
    <div className="personal-bookshelf-page">
      <h2>My Bookshelf</h2>
      <div className="bookshelf">
        {bookshelf.map((book) => (
          <div key={book.key} className="book-card">
            <h3>{book.title}</h3>
            <p>Author(s): {book.author_name ? book.author_name.join(', ') : 'N/A'}</p>
            <p>Edition Count: {book.edition_count}</p>
            <button onClick={() => removeFromBookshelf(book)}>
              Remove from Bookshelf
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalBookshelfPage;