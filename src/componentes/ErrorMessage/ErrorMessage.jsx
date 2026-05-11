import './ErrorMessage.css';

export const ErrorMessage = ({ message, onBack }) => (
  <div className="error-message">
    <p>⚠️ {message}</p>
    {onBack && <button onClick={onBack}>Volver</button>}
  </div>
);