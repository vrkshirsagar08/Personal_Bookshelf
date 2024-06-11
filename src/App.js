import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import BookSearchPage from './Components/BookSearchPage';
import PersonalBookshelfPage from './Components/PersonalBookshelfPage';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const savedBookshelf = JSON.parse(localStorage.getItem('bookshelf'));
    if (savedBookshelf) {
      setBookshelf(savedBookshelf);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        fetchBookResults();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchBookResults = async () => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${searchTerm}&limit=10`
      );
      setSearchResults(response.data.docs);
    } catch (error) {
      console.error('Error fetching book results:', error);
    }
  };

  const addToBookshelf = (book) => {
    const updatedBookshelf = [...bookshelf, book];
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  const removeFromBookshelf = (book) => {
    const updatedBookshelf = bookshelf.filter((b) => b.key !== book.key);
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Personal Bookshelf</h1>
          <nav>
            <div>
            <ul>
              <li>
                <Link to="/">Book Search</Link>
              </li>
              <li>
                <Link to="/bookshelf">My Bookshelf</Link>
              </li>
            </ul>
            </div>
          </nav>
        </header>
        <main>
          <Routes>
            <Route
          path="/bookshelf"
              element={
                <PersonalBookshelfPage
                  bookshelf={bookshelf}
                  removeFromBookshelf={removeFromBookshelf}
                />
              }
            />
            <Route
              path="/"
              element={
                <BookSearchPage
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  searchResults={searchResults}
                  addToBookshelf={addToBookshelf}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;