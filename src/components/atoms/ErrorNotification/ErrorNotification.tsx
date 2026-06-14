import './ErrorNotification.scss';

export const ErrorNotification = () => {
  return (
    <div className="error-notification">
      <p className="error-notification__message">Something went wrong</p>

      <button className="error-notification__button" onClick={() => window.location.reload()}>
        Reload
      </button>
    </div>
  );
};
