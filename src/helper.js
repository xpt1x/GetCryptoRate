import { API_URL, DEFAULT_COIN, DEFAULT_CURRENCY, LOCAL_COIN_RATE } from "./config";

function getCoinGeckoUrl(coin, currency) {
  if (!checkCoinValue(coin) || !checkCurrencyValue(currency)) return "";
  return `${API_URL}/simple/price?ids=${coin}&vs_currencies=${currency}`;
}

export const checkCoinValue = (coin) => {
  //TODO: check coin value
  return true;
};

export const checkCurrencyValue = (coin) => {
  // TODO: check currency value
  return true;
};

async function GeckoFetchRequest() {
  return await fetch(getCoinGeckoUrl(DEFAULT_COIN, DEFAULT_CURRENCY));
}

export async function FetchRate() {
  try {
    const response = await GeckoFetchRequest();
    const responseJson = await response.json();
    if(Object.keys(responseJson).length === 0)
      return Promise.reject('Failure')
    localStorage.setItem(
      LOCAL_COIN_RATE,
      responseJson[DEFAULT_COIN][DEFAULT_CURRENCY]
    );
  } catch (error) {
    console.log(error);
  }
}
