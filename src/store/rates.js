import { getExchangeRates } from "../api";

const initialState = {
  amount: "19.50",
  currencyCode: "USD",
  currencyData: { USD: 1.0 },
  supportedCurrencies: ["USD", "EUR", "JPY", "CAD", "GBP", "MXN"]
}

export function ratesReducer(state = initialState, action) {
  switch(action.type) {
    case AMOUNT_CHANGED:
      return {
        ...state,
        amount: action.payload
      }
    case CURRENCY_CODE_CHANGED:
      return {
        ...state,
        currencyCode: action.payload
      }
    default:
      return state
  }
} 

// STATE SELECTORS functions

export const getAmount = (state) => state.rates.amount
export const getCurrencyCode = (state) => state.rates.currencyCode
export const getCurrencyData = (state) => state.rates.currencyData
export const supportedCurrencies = (state) => state.rates.supportedCurrencies


// ACTION TYPES CONSTANTS
export const AMOUNT_CHANGED = "rates/amount"
export const CURRENCY_CODE_CHANGED = "rates/currencyCode"
export const RATES_RECEIVED = "rates/currencyData"


// ACTION CREATORS
export const changeAmount = (amount) => ({
  type: AMOUNT_CHANGED,
  payload: amount
})

// make the API call so we can update this list to ensure only currency code found in our response are actually included in our ddropdown list

export const changeCurrencyCode = (newCurrency) => (dispatch) => {
  dispatch({
    type: CURRENCY_CODE_CHANGED,
    payload: newCurrency
  })
  getExchangeRates().then()
}

//thunk 

export function getInitialRatesThunk(dispatch, getState) {
  const state = getState();
  const currencyCode = getCurrencyCode(state);
  dispatch(changeCurrencyCode(currencyCode))
}