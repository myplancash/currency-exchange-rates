import { useDispatch } from 'react-redux';
import { changeCurrencyCode } from "../store/rates";

export function CurrencyCodePicker({supportedCurrencies, currencyCode}) {
  const  dispatch = useDispatch();

  const onChange = (e) => {
    const newCurrency = e.target.value;
    dispatch(changeCurrencyCode(newCurrency))
  }

  return (
    <select className="currencyCode" value={currencyCode} onChange={onChange}>
      {supportedCurrencies.map((code) => (
        <option key={code} value={code}>
          {code}
        </option>
      ))}
    </select>
  );
}
