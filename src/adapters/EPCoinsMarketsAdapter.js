export const EPCoinsMarketsAdapter = (data) => {
  const refactor = {
    id: data.id,
    name: data.name,
    marketCapRank: data.market_cap_rank,
    market_data: data.market_data,
    image: data.image,
    symbol: data.symbol,
    currentPrice: data.current_price,
    priceChangePercentage24h: data.price_change_percentage_24h,
    priceChangePercentage7dInCurrency:
      data.price_change_percentage_7d_in_currency,
    totalVolume: data.total_volume,
    marketCap: data.market_cap,
    sparklineIn7d: data.sparkline_in_7d,
    priceChangePercentage7dInCurrency:
      data.price_change_percentage_7d_in_currency,
  };

  return refactor;
};
