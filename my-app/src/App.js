import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to store the fetched blog posts
  const [posts, setPosts] = useState([]);
  // State to store error messages
  const [error, setError] = useState(null);
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);

  // Fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        // Check if the response is ok
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        // Save the data to the state
        setPosts(data);
        // Update loading state
        setIsLoading(false);
      } catch (err) {
        // Save the error message to state
        setError(err.message);
        // Update loading state
        setIsLoading(false);
      }
    };

    // Run the fetch function
    fetchPosts();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="App">
      <h1>Blog Posts</h1>

      {/* Show a loading message while fetching */}
      {isLoading && <p>Loading...</p>}

      {/* Show an error message if fetching fails */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Render posts if successfully fetched */}
      {!isLoading && !error && (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
