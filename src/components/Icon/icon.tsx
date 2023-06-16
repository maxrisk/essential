import React from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

export type ThemeType = 'danger' | 'primary' | 'mute' | 'success' | 'warning';

export type IconProps = {
  theme?: ThemeType;
} & FontAwesomeIconProps;

export const Icon: React.FC<IconProps> = (props) => {
  const { theme, className, ...rest } = props;
  const classes = classNames({
    [`icon-${theme}`]: theme,
  }, className);

  return <FontAwesomeIcon className={classes} {...rest} />;
};

export default Icon;
