import React from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

export type ThemeType = 'danger' | 'primary' | 'mute' | 'success' | 'warning';

export type IconProps = {
  theme?: ThemeType;
  spin?: boolean;
} & FontAwesomeIconProps;

export const Icon: React.FC<IconProps> = (props) => {
  const {
    theme, className, spin, ...rest
  } = props;
  const classes = classNames({
    [`icon-${theme}`]: theme,
    'animate-spin': spin,
  }, className);

  return <FontAwesomeIcon className={classes} {...rest} />;
};

export default Icon;
