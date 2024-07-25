export const MDIcon = ({
  className = '',
  onClick = () => {},
  size = 50,
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 240 140"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    onClick={onClick}
  >
    <path
      fill="none"
      stroke={color}
      strokeWidth={10}
      d="M20 10h200q10 0 10 10v100q0 10-10 10H20q-10 0-10-10V20q0-10 10-10"
    />
    <text x={10} y={120} fill={color} fontSize={140} fontWeight={600}>
      {'M\n  '}
    </text>
    <path stroke={color} fill="none" strokeLinecap="square" strokeWidth={20} d="M180 30v60" />
    <path fill={color} stroke="none" d="M140 70h80l-40 50z" />
  </svg>
)
