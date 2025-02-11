/* eslint-disable react/react-in-jsx-scope */

export default function Input ({label, id, error, ...props}) {
    return (
        <div className="control no-margin">
          <label htmlFor={id}>{label}</label>
          <input
            id={id}
            type="email"
            {...props}
          />
          <div className="control-error">
            {error && <p>{error}</p>}
          </div>
        </div>
    )
}