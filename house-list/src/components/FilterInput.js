
import './FilterInput.css';

export const FilterInput = ({ placeholder, type = 'text', value, onChange, label }) => {
  return (
    <div className="filter-input-container">
      {label && <label className="filter-label">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="filter-input"
      />
    </div>
  );
};
