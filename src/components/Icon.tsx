import React from 'react';
import Svg, {Circle, Line, Path} from 'react-native-svg';

export type IconName = 'home' | 'explore' | 'create' | 'credits' | 'profile';

interface Props {
  name: IconName;
  color: string;
  size?: number;
  active?: boolean;
}

/** Lightweight line/filled icon set (Feather-style). Filled when active. */
export function Icon({name, color, size = 24, active}: Props) {
  const fill = active ? color : 'none';
  const sw = active ? 1.6 : 1.9;
  const common = {
    stroke: color,
    strokeWidth: sw,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {name === 'home' && (
        <Path
          {...common}
          fill={fill}
          d="M3 10.6 12 3.2l9 7.4V20a1 1 0 0 1-1 1h-5v-6.2H9V21H4a1 1 0 0 1-1-1z"
        />
      )}
      {name === 'explore' && (
        <>
          <Circle {...common} cx={12} cy={12} r={9} />
          <Path {...common} fill={fill} d="M15.8 8.2 13.4 13.4 8.2 15.8 10.6 10.6z" />
        </>
      )}
      {name === 'create' && (
        <>
          <Line {...common} x1={12} y1={5.5} x2={12} y2={18.5} />
          <Line {...common} x1={5.5} y1={12} x2={18.5} y2={12} />
        </>
      )}
      {name === 'credits' && (
        <Path
          {...common}
          fill={fill}
          d="M6 3h12l3 6-9 11.5L3 9zM3 9h18M9 3 6.5 9 12 20.5 17.5 9 15 3"
        />
      )}
      {name === 'profile' && (
        <>
          <Circle {...common} fill={fill} cx={12} cy={8} r={4} />
          <Path {...common} d="M4.5 20.5v-.8a5.5 5.5 0 0 1 5.5-5.5h4a5.5 5.5 0 0 1 5.5 5.5v.8" />
        </>
      )}
    </Svg>
  );
}
