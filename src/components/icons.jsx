// Thin single-stroke line-art icons for the "Big Day" schedule.
// All use currentColor and a consistent ~1.5px stroke.

const base = {
  width: 40,
  height: 40,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function Church(props) {
  return (
    <svg {...base} {...props}>
      <path d="M24 4v8M20 8h8" />
      <path d="M24 12 12 22v22h24V22L24 12Z" />
      <path d="M24 12v32" />
      <path d="M20 44v-8a4 4 0 0 1 8 0v8" />
      <path d="M16 26h4M28 26h4" />
    </svg>
  );
}

function Camera(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 16h6l3-4h18l3 4h6v22H6V16Z" />
      <circle cx="24" cy="27" r="7" />
      <circle cx="24" cy="27" r="2.5" />
    </svg>
  );
}

function Cheers(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14 6l4 14M34 6l-4 14" />
      <path d="M10 20h12l-2 8a4 4 0 0 1-8 0l-2-8Z" />
      <path d="M26 20h12l-2 8a4 4 0 0 1-8 0l-2-8Z" />
      <path d="M16 40v2M32 40v2M12 42h8M28 42h8" />
    </svg>
  );
}

function Dinner(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="24" r="12" />
      <circle cx="24" cy="24" r="6" />
      <path d="M8 6v10a3 3 0 0 0 6 0V6M11 6v10" />
      <path d="M40 6c-2 0-3 3-3 7s1 5 3 5v-12ZM40 18v24" />
      <path d="M8 20v22" />
    </svg>
  );
}

function Party(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 42 18 16l14 14L6 42Z" />
      <path d="M18 16l-2-2" />
      <path d="M28 8c0 3 3 3 3 6M34 4c3 0 3 3 6 3M32 18c3 0 4 2 4 5" />
      <circle cx="24" cy="26" r="1" />
      <circle cx="16" cy="34" r="1" />
    </svg>
  );
}

const icons = {
  church: Church,
  camera: Camera,
  cheers: Cheers,
  dinner: Dinner,
  party: Party,
};

export default function Icon({ name, ...props }) {
  const Cmp = icons[name] || Church;
  return <Cmp {...props} />;
}
