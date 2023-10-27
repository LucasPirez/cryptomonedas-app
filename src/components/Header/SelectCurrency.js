import useClick from '../../hook/useClick'
import ChevronUp from '../Icons/ChevronUp'
import ChevronDown from '../Icons/ChevrowDown'
import styles from './SelectCurrency.module.css'
import { useSelector } from 'react-redux'

const symbols = [
  [
    ['AED', 'د.إ'],
    ['ARS', '$'],
    ['AUD', '$']
  ],
  [
    ['BDT', '৳'],
    ['BHD', '.د.ب'],
    ['BMD', '$'],
    ['BRL', 'R$']
  ],
  [
    ['CAD', '$'],
    ['CHF', 'CHF'],
    ['CLP', '$'],
    ['CNY', '¥'],
    ['CZK', 'Kč']
  ],
  [['DKK', 'kr']],
  [['EUR', '€']],
  [['GBP', '£']],
  [
    ['HKD', '$'],
    ['HUF', 'Ft']
  ],
  [
    ['IDR', 'Rp'],
    ['ILS', '₪'],
    ['INR', '₹']
  ],
  [['JPY', '¥']],
  [
    ['KRW', '₩'],
    ['KWD', 'د.ك']
  ],

  [['LKR', '₨']],
  [
    ['MMK', 'K'],
    ['MXN', '$'],
    ['MYR', 'RM']
  ],
  [
    ['NGN', '₦'],
    ['NOK', 'kr'],
    ['NZD', '$']
  ],
  [
    ['PHP', '₱'],
    ['PKR', '₨'],
    ['PLN', 'zł']
  ],
  [['RUB', '₽']],
  [
    ['SAR', '﷼'],
    ['SEK', 'kr'],
    ['SGD', '$']
  ],
  [
    ['THB', '฿'],
    ['TRY', '₤'],
    ['TWD', 'NT$']
  ],
  [
    ['UAH', '₴'],
    ['USD', '$']
  ],
  [
    ['VEF', 'Bs'],
    ['VND', '₫']
  ],
  [['XDR', 'SDR']],
  [['ZAR', 'R']]
]

export default function SelectCurrency({
  handleClick,
  viewSelect,
  handleVisibility
}) {
  const { currencySelect } = useSelector((state) => state.criptoList)

  const { ref } = useClick(() => handleVisibility(false))

  const select = (value) => {
    const s = currencySelect.currency.toLowerCase() === value.toLowerCase()

    return s ? styles.select : ''
  }
  return (
    <>
      <div ref={ref}>
        <div className={styles.container}>
          <button onClick={handleVisibility} className={styles.button}>
            {currencySelect ? currencySelect.currency : 'usd'}
            {!viewSelect ? <ChevronDown /> : <ChevronUp />}
          </button>
          <div
            className={`${styles.sub_container} ${
              viewSelect ? styles.viewSelect : ''
            }`}
          >
            {symbols.map((group, i) => {
              return (
                <div key={`${i}---${group[0]}--${group[1]}`}>
                  <p className={styles.separator}>{group[0][0][0]}</p>
                  {group.map((symbolCurrency, k) => {
                    return (
                      <div
                        key={`${i}-${k}-${symbolCurrency[0]}-${symbolCurrency[1]}`}
                        className={`${styles.container_span} ${select(
                          symbolCurrency[0]
                        )}`}
                        onClick={(e) =>
                          handleClick(e, symbolCurrency[0], symbolCurrency[1])
                        }
                        data-testid={'idButton'}
                      >
                        <span>{symbolCurrency[1]}</span>
                        <span className={styles.container_span_span}>
                          {symbolCurrency[0]}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
