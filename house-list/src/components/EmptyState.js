
import './EmptyState.css';

export const EmptyState = ({ message = 'No items found', icon = '🏠' }) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <p className="empty-message">{message}</p>
    </div>
  );
};
