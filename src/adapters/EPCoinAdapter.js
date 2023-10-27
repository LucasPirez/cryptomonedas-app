export const EPCoinAdapter = (data) => {
  const { links, market_data } = data

  const marketData = {
    total_volume: market_data.total_volume,
    market_cap: market_data.market_cap,
    price_change_percentage_24h: market_data.price_change_percentage_24h,
    current_price: market_data.current_price,
    price_change_percentage_7d: market_data.price_change_percentage_7d,
    price_change_percentage_14d: market_data.price_change_percentage_14d,
    price_change_percentage_30d: market_data.price_change_percentage_30d,
    low_24h: market_data.low_24h,
    high_24h: market_data.high_24h
  }

  const dataLinks = {
    chat_url: links.chat_url,
    blockchain_site: links.blockchain_site,
    homepage: links.homepage,
    official_forum_url: links.official_forum_url,
    twitter_screen_name: links.twitter_screen_name,
    subreddit_url: links.subreddit_url,
    facebook_username: links.facebook_username
  }
  const refactorCoin = {
    market_cap_rank: data.market_cap_rank,
    image: data.image,
    name: data.name,
    symbol: data.symbol,
    market_data: marketData,
    links: dataLinks,
    id: data.id
  }

  return refactorCoin
}
