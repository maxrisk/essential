import React from 'react';
import { ThemeType } from '../Icon/icon';

export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  theme?: ThemeType;
  style?: React.CSSProperties;
}

const Progress: React.FC<ProgressProps> = (props) => {
  const {
    percent,
    showText = true,
    strokeHeight,
    theme = 'primary',
    style,
  } = props;

  return (
    <div className="es-progress-bar" style={style}>
      <div className="es-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
        <div className={`es-progress-bar-inner color-${theme}`} style={{ width: `${Math.min(100, percent)}%` }}>
          {showText ? <span>{`${percent}%`}</span> : null}
        </div>
      </div>
    </div>
  );
};

export default Progress;
