import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('asc');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(response => setProducts(response.data.slice(0, 50)))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === 'asc') return a.title.localeCompare(b.title);
    return b.title.localeCompare(a.title);
  });

  const paginatedProducts = sortedProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="product-container">
      <h2>Product Listing</h2>
      <div>
        <label>Sort by Title: </label>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <ul>
        {paginatedProducts.map(product => (
          <li key={product.id}>
            <img src={product.thumbnailUrl} alt={product.title} />
            <p>{product.title}</p>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
          Previous
        </button>
        <span> Page {page} </span>
        <button onClick={() => setPage(p => p + 1)} disabled={page * itemsPerPage >= products.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductListing;
