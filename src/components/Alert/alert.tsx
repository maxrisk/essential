import React, { useState } from 'react';
import classNames from 'classnames';

export type AlertType = 'warning' | 'danger' | 'success' | 'info';

interface AlertProps {
  title: string;
  type?: AlertType;
}

const Alert: React.FC<AlertProps> = (props) => {
  const { title, type } = props;
  const [visible, setVisible] = useState(true);
  const handleClose = () => {
    setVisible(false);
  };

  const classes = classNames('alert', {
    [`alert-${type}`]: type,
  });

  if (!visible) {
    return null;
  }

  return (
    <div className={classes}>
      <svg className="icon" aria-hidden="true" data-testid="alert-icon">
        <use xlinkHref={`#icon-${type}`} />
      </svg>
      <span className="alert-title">{title}</span>
      <button onClick={handleClose} type="button" className="alert-close-btn" data-testid="close-btn">
        <svg className="icon icon-close" aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </div>
  );
};

export default Alert;

Alert.defaultProps = {
  type: 'info',
};
