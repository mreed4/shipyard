import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import "./CustomSelect.css";

export default function CustomSelect({ value, onChange, options, label, disabledOptions = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    if (disabledOptions.includes(optionValue)) return;
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt === value);
  const displayValue = selectedOption ? selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1) : "";

  return (
    <div className="custom-select" ref={selectRef}>
      <button className="custom-select-trigger" onClick={() => setIsOpen(!isOpen)} type="button">
        <span>{displayValue}</span>
        <ChevronDown size={16} className={`chevron ${isOpen ? "open" : ""}`} />
      </button>
      {isOpen && (
        <div className="custom-select-dropdown">
          {options.map((option) => (
            <button
              key={option}
              className={`custom-select-option ${value === option ? "active" : ""} ${disabledOptions.includes(option) ? "disabled" : ""}`}
              onClick={() => handleSelect(option)}
              type="button"
              disabled={disabledOptions.includes(option)}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
