export const BarPositionTopIcon = ({
  className = '',
  onClick = () => {},
  size = 50,
  color = 'currentColor',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
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
        d="M30,0 L70,0 Q100,0 100,30 L100,70 Q100,100 70,100 L30,100 Q0,100 0,70 L0,30 Q0,0 30,0"
        stroke={color}
      />
      <path d="M0,30 L100,30 Q100,0 70,0 L30,0 Q0,0 0,30" fill={color} />
    </svg>
  )
}
export const BarPositionRightIcon = ({
  className = '',
  onClick = () => {},
  size = 50,
  color = 'currentColor',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
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
        d="M30,0 L70,0 Q100,0 100,30 L100,70 Q100,100 70,100 L30,100 Q0,100 0,70 L0,30 Q0,0 30,0"
        stroke={color}
      />
      <path d="M70,100 L70,0 Q100,0 100,30 L100,70 Q100,100 70,100" fill={color} />
    </svg>
  )
}
export const BarPositionLeftIcon = ({
  className = '',
  onClick = () => {},
  size = 50,
  color = 'currentColor',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
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
        d="M30,0 L70,0 Q100,0 100,30 L100,70 Q100,100 70,100 L30,100 Q0,100 0,70 L0,30 Q0,0 30,0"
        stroke={color}
      />
      <path d="M30,100 L30,0 Q0,0 0,30 L0,70 Q0,100 30,100" fill={color} />
    </svg>
  )
}
export const BarPositionBottomIcon = ({
  className = '',
  onClick = () => {},
  size = 50,
  color = 'currentColor',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
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
        d="M30,0 L70,0 Q100,0 100,30 L100,70 Q100,100 70,100 L30,100 Q0,100 0,70 L0,30 Q0,0 30,0"
        stroke={color}
      />
      <path d="M0,70 L100,70 Q100,100 70,100 L30,100 Q0,100 0,70" fill={color} />
    </svg>
  )
}
