export const ErrorIcon = ({
  className = '',
  onClick = () => {},
  size = 50,
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 120 120"
    fill="none"
    stroke={color}
    strokeWidth={20}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    onClick={onClick}
  >
    <circle cx={60} cy={60} r={50} strokeWidth={10} />
    <circle cx={60} cy={90} r={1} fill={color} />
    <path strokeWidth={10} d="M60 30v40" />
  </svg>
)

export const SuccessIcon = ({
  className = '',
  onClick = () => {},
  size = 50,
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 120 120"
    fill="none"
    stroke={color}
    strokeWidth={20}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width={size}
    height={size}
    onClick={onClick}
  >
    <path
      d="m30 60 25 25 35-45"
      fill="none"
      stroke={color}
      strokeWidth={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx={60} cy={60} r={50} fill="none" stroke={color} strokeWidth={10} />
  </svg>
)

{
  /* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <path d="M30,60 L55,85 L90,40" fill="none" stroke="red" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="60" cy="60" r="50" fill="none" stroke="red" stroke-width="10" />
</svg> */
}
