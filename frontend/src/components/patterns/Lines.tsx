import { clsx } from 'clsx'

type LineProps = {
  width?: number
  height?: number
  className?: string
}
const Lines = ({ width, height, className }: LineProps) => {
  return (
    <div className={'absolute inset-0'}>
      <svg
        width={width || 1172}
        height={height || 5737}
        viewBox="0 0 1172 5737"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx('h-full w-[1170px] opacity-60', className)}
        preserveAspectRatio="none"
      >
        <g opacity="0.6">
          <path
            opacity="0.2"
            d="M1 -1V5737"
            stroke="#10b981"
            strokeWidth="1.5"
          />
          <path
            opacity="0.2"
            d="M294 -1V5737"
            stroke="#10b981"
            strokeWidth="1.5"
          />
          <path
            opacity="0.2"
            d="M586 -1V5737"
            stroke="#10b981"
            strokeWidth="1.5"
          />
          <path
            opacity="0.2"
            d="M879 -1V5737"
            stroke="#10b981"
            strokeWidth="1.5"
          />
          <path
            opacity="0.2"
            d="M1171 -1V5737"
            stroke="#10b981"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  )
}
export default Lines
