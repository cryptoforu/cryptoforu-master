import { useId } from 'react';
import {
  Box,
  Icon,
  IconProps,
  useColorModeValue as mode,
} from '@chakra-ui/react';

export interface PatternProps extends IconProps {
  width: number;
  height: number;
  x: string;
  y: string;
  squares: [number, number][];
}

export function Pattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: PatternProps) {
  const patternId = useId();
  return (
    <Icon aria-hidden={true} {...props}>
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
    </Icon>
  );
}

export default function GridPattern() {
  return (
    <Box
      position="absolute"
      inset={0}
      zIndex={-10}
      mx="0"
      maxWidth="none"
      overflow="hidden"
    >
      <Box
        position="absolute"
        left="50%"
        top={0}
        ml="-38rem"
        height="25rem"
        width="81.25rem"
        sx={{
          maskImage: 'linear-gradient(white,transparent)',
        }}
      >
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-r, green.600, emerald.400, teal.600)"
          opacity={0.4}
          sx={{
            maskImage:
              'radial-gradient(farthest-side_at_top,white,transparent)',
          }}
        >
          <Pattern
            width={72}
            height={56}
            x="-12"
            y="4"
            squares={[
              [4, 3],
              [2, 1],
              [7, 3],
              [10, 6],
            ]}
            position="absolute"
            insetX={0}
            insetY="-50%"
            h="200%"
            w="100%"
            skewY="-18deg"
            fill={mode('blackAlpha.400', 'whiteAlpha.100')}
            stroke={mode('blackAlpha.500', 'whiteAlpha.50')}
            mixBlendMode="overlay"
          />
        </Box>
        <Icon
          viewBox="0 0 1113 440"
          aria-hidden={true}
          position="absolute"
          top={0}
          left="50%"
          ml="-19rem"
          w="69.5625rem"
          fill="white"
          blur="26px"
          _dark={{
            display: 'none',
          }}
        >
          <path d="M.016 439.5s-9.5-300 434-300S882.516 20 882.516 20V0h230.004v439.5H.016Z" />
        </Icon>
      </Box>
    </Box>
  );
}
