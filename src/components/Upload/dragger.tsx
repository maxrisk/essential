import React, { DragEvent, useState } from 'react';
import classNames from 'classnames';

export interface DraggerProps {
  /** 当有拖拽文件的回调 */
  onFile: (files: FileList) => void;
  children?: React.ReactNode;
}

const Dragger: React.FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);

  const classes = classNames('es-dragger', {
    'is-drag-over': dragOver,
  });

  const handleDragOver = (e: DragEvent<HTMLElement>, isDragOver: boolean) => {
    e.preventDefault();
    setDragOver(isDragOver);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };

  return (
    <div
      className={classes}
      onDragOver={(e) => handleDragOver(e, true)}
      onDragLeave={(e) => handleDragOver(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Dragger;
