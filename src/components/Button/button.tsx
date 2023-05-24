import React from 'react';
import classNames from 'classnames';

export type ButtonSize = 'sm' | 'lg';

export type ButtonType = 'primary' | 'danger';

export interface BaseButtonProps {
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  round?: boolean;
  circle?: boolean;
}

export type ButtonProps =
  & React.ButtonHTMLAttributes<HTMLElement>
  & BaseButtonProps;

function Button(props: ButtonProps) {
  const {
    btnType,
    className,
    children,
    disabled,
    size,
    round,
    circle,
    ...rest
  } = props;

  const classes = classNames('btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    round,
    circle,
    disabled,
    className,
  });

  return (
    <button className={classes} disabled={disabled} type="button" {...rest}>
      {children}
    </button>
  );
}

export default Button;
