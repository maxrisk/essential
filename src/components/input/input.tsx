import React, { InputHTMLAttributes } from 'react';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import Icon from '../Icon';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /** 标题 */
  label?: string;
  /** 状态，控制边框颜色 */
  status?: 'success' | 'fail';
  /** 尺寸 */
  size?: 'lg' | 'normal';
  /** 前缀图标 */
  prefix?: IconName;
  /** 带标签的 input，设置后置标签 */
  addonAfter?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input: React.FC<InputProps> = (props) => {
  const {
    size, prefix, status, addonAfter, ...rest
  } = props;

  const classes = classNames('es-input', {
    [`es-input-${size}`]: size,
    [`es-input-${status}`]: status,
  });

  return (
    <div className="es-input-wrapper">
      <div className="es-input-affix-wrapper" data-testid="test-input-prefix">
        {prefix
          && <Icon icon={prefix} className="es-input-prefix" />}
        <input className={classes} {...rest} />
      </div>
      {addonAfter}
    </div>
  );
};

export default Input;
