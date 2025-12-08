// Ship type icons in Lucide style
// Usage: <FighterIcon size={16} className="my-class" />

export const FighterIcon = ({ size = 24, className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ display: "block", ...props.style }}
    {...props}>
    <path d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z" />
    <path d="M8 10L6 14" />
    <path d="M16 10L18 14" />
  </svg>
);

export const FrigateIcon = ({ size = 24, className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ display: "block", ...props.style }}
    {...props}>
    <path d="M12 3L14 7H18L19 10V14L18 17H14L12 21L10 17H6L5 14V10L6 7H10L12 3Z" />
    <line x1="5" y1="12" x2="3" y2="12" />
    <line x1="19" y1="12" x2="21" y2="12" />
  </svg>
);

export const CruiserIcon = ({ size = 24, className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ display: "block", ...props.style }}
    {...props}>
    <path d="M12 2V6" />
    <path d="M8 6H16L18 10V16L16 20H8L6 16V10L8 6Z" />
    <line x1="6" y1="10" x2="3" y2="8" />
    <line x1="18" y1="10" x2="21" y2="8" />
    <line x1="6" y1="16" x2="3" y2="18" />
    <line x1="18" y1="16" x2="21" y2="18" />
  </svg>
);

export const CarrierIcon = ({ size = 24, className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ display: "block", ...props.style }}
    {...props}>
    <rect x="7" y="5" width="10" height="14" rx="2" />
    <line x1="7" y1="9" x2="4" y2="9" />
    <line x1="17" y1="9" x2="20" y2="9" />
    <line x1="7" y1="15" x2="4" y2="15" />
    <line x1="17" y1="15" x2="20" y2="15" />
    <path d="M10 5V3" />
    <path d="M14 5V3" />
  </svg>
);

export const CapitalShipIcon = ({ size = 24, className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ display: "block", ...props.style }}
    {...props}>
    <path d="M12 2L15 6H19L21 10V14L19 18H15L12 22L9 18H5L3 14V10L5 6H9L12 2Z" />
    <path d="M8 10H16" />
    <path d="M8 14H16" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

// Helper function to get icon component by ship type
export const getShipIcon = (shipType) => {
  const iconMap = {
    Fighter: FighterIcon,
    Frigate: FrigateIcon,
    Cruiser: CruiserIcon,
    Carrier: CarrierIcon,
    "Capital Ship": CapitalShipIcon,
  };
  return iconMap[shipType] || CruiserIcon; // Default to Cruiser if type not found
};
