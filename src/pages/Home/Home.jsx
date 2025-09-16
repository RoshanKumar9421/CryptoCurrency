

import React, { useEffect, useState, useContext } from 'react';
import './Home.css';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  // Update coins when API data changes
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  // Input change handler
  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") setDisplayCoin(allCoin);
  };

  // Form submit handler
  const searchHandler = (event) => {
    event.preventDefault();
    const filteredCoins = allCoin.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase()) ||
      item.symbol.toLowerCase().includes(input.toLowerCase())
    );
    setDisplayCoin(filteredCoins);
  };

  return (
    <div className='home'>
      <div className='hero'>
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace.
          Sign up to explore more about cryptos.
        </p>
        <form onSubmit={searchHandler}>
          <input
            type='text'
            placeholder='Search crypto...'
            value={input}
            onChange={inputHandler}
            list='coinlist'
            required
          />
          <datalist id='coinlist'>
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button type='submit'>Search</button>
        </form>
      </div>

      <div className='crypto-table'>
        {/* Table Header */}
        <div className='table-layout'>
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>

        {/* Table Rows */}
        {displayCoin.length > 0 ? (
          displayCoin.slice(0, 10).map((item) => (
            <Link to={`/coin/${item.id}`} className='table-layout' key={item.id}>
              <p>{item.market_cap_rank}</p>

              {/* Coin Name & Image */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <img src={item.image} alt={item.name} style={{ width: "25px", height: "25px" }} />
                <p>{item.name} ({item.symbol.toUpperCase()})</p>
              </div>

              {/* Current Price */}
              <p>{currency.symbol}{item.current_price.toLocaleString()}</p>

              {/* 24H Change */}
              <p
                style={{
                  textAlign: "center",
                  color: item.price_change_percentage_24h >= 0 ? "limegreen" : "red"
                }}
              >
                {item.price_change_percentage_24h?.toFixed(2)}%
              </p>

              {/* Market Cap */}
              <p className='market-cap'>
                {currency.symbol}{item.market_cap.toLocaleString()}
              </p>
            </Link>
          ))
        ) : (
          <p style={{ textAlign: "center", padding: "20px" }}>No coins found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
