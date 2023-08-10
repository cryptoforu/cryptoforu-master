'use client'
import { useId } from 'react-aria'

interface GridProps {
  width: number
  height: number
  x: string
  y: string
  squares: [x: number, y: number][]
  className?: string
  id: string
}

const GridPattern = (props: GridProps) => {
  const { width, height, x, y, squares, className } = props
  let patternId = useId(props.id)
  return (
    <svg aria-hidden={'true'} className={className}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  )
}
export default GridPattern
