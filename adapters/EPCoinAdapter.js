export const EPCoinAdapter = (data) => {
  const marketData = {
    total_volume: data.market_data.total_volume,
    market_cap: data.market_data.market_cap,
    price_change_percentage_24h: data.market_data.price_change_percentage_24h,
    current_price: data.market_data.current_price,
    price_change_percentage_7d: data.market_data.price_change_percentage_7d,
    price_change_percentage_14d: data.market_data.price_change_percentage_14d,
    price_change_percentage_30d: data.market_data.price_change_percentage_30d,
    low_24h: data.market_data.low_24h,
    high_24h: data.market_data.high_24h,
  };

  const links = {
    chat_url: data.links.chat_url,
    blockchain_site: data.links.blockchain_site,
    official_forum_url: data.links.official_forum_url,
    twitter_screen_name: data.links.twitter_screen_name,
    subreddit_url: data.links.subreddit_url,
    facebook_username: data.links.facebook_username,
  };
  const refactorCoin = {
    market_cap_rank: data.market_cap_rank,
    image: data.image,
    name: data.name,
    symbol: data.symbol,
    market_data: marketData,
    links: links,
    id: data.id,
  };

  return refactorCoin;
};
