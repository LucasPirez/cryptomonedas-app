export const EPExchangesAdapter = (data) => {
  const refactorData = {
    id: data.id,
    name: data.name,
    country: data.country,
    url: data.url,
    image: data.image,
    trustScore: data.trust_score,
    trustScoreRank: data.trust_score_rank,
    tradeVolume24hBTC: data.trade_volume_24h_btc,
    tradeVolume24hBTCNormalized: data.trade_volume_24h_btc_normalized,
    description: data.description,
  };

  return refactorData;
};
