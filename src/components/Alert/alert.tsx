import React, { useState } from 'react';
import classNames from 'classnames';
import {
  faBan,
  faBell,
  faCircleCheck,
  faCircleExclamation,
  faCircleXmark,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import Transition from '../Transition/transition';
import { Icon } from '../Icon/icon';

export type AlertType = 'warning' | 'danger' | 'success' | 'primary';

interface AlertProps {
  title: string;
  type?: AlertType;
}

const iconMap: Record<AlertType, IconDefinition> = {
  danger: faBan,
  warning: faCircleExclamation,
  success: faCircleCheck,
  primary: faBell,
};

const Alert: React.FC<AlertProps> = (props) => {
  const { title, type = 'primary' } = props;
  const [visible, setVisible] = useState(true);
  const handleClose = () => {
    setVisible(false);
  };

  const classes = classNames('alert', {
    [`alert-${type}`]: type,
  });

  return (
    <Transition
      animation="zoom-in-top"
      in={visible}
      timeout={300}
    >
      <div className={classes}>
        <Icon icon={iconMap[type]} theme={type} size="lg" className="icon" />
        <span className="alert-title">{title}</span>
        <button
          onClick={handleClose}
          type="button"
          className="alert-close-btn"
          data-testid="close-btn"
        >
          <Icon icon={faCircleXmark} size="lg" />
        </button>
      </div>
    </Transition>
  );
};

export default Alert;
