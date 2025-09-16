

import { useEffect, useState, createContext } from "react";

const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

//   const fetchAllCoin = async () => {
//     const url = `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`;
//     const options = {
//       method: "GET",
//       headers: { "x-cg-pro-api-key": "CG-b7ZeUNCYi1HHPMBvgGua5wKN" },
//     };

//     try {
//       const response = await fetch(url, options);
//       const data = await response.json();
//       console.log("Fetched coins:", data);
//       setAllCoin(data); // ✅ set state with actual data
//     } catch (error) {
//       console.error("Error fetching coins:", error);
//     }
//   };

const fetchAllCoin = async () => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=50&page=1&sparkline=false`;
  
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      console.log("Fetched coins:", data.length, "coins");
      setAllCoin(data);
    } else {
      console.error("Unexpected API response:", data);
      setAllCoin([]); // fallback
    }
  } catch (error) {
    console.error("Error fetching coins:", error);
    setAllCoin([]); // fallback
  }
};

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export { CoinContext };
export default CoinContextProvider;
