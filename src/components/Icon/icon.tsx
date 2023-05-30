import React from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

type ThemeType = 'danger' | 'primary' | 'mute' | 'success' | 'warning';

export type IconProps = {
  theme?: ThemeType;
} & FontAwesomeIconProps;

const Icon: React.FC<IconProps> = (props) => {
  const { theme, ...rest } = props;
  const classes = classNames({
    [`icon-${theme}`]: theme,
  });

  return <FontAwesomeIcon className={classes} {...rest} />;
};

export default Icon;