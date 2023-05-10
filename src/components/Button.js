import { color } from '../styles/colors'

export default function Button({
  children,
  onClick,
  select,
  disabled = false
}) {
  return (
    <>
      <button
        className={select ? 'select' : ''}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
      <style jsx>{`
        button {
          margin: 0 0.2em;
          padding: 0.2em 0.5em;
          border: 2px dashed ${color.lightBlue};
          border-radius: 3px;
          background: transparent;
          transition: all 0.3s;
          cursor: pointer;
        }

        .select {
          background: ${color.reduceBackground};
          border: 2px dashed ${color.blue};
        }
      `}</style>
    </>
  )
}
