import React from 'react';
import type { UploadFile } from './upload';
import Icon from '../Icon';
import ProgressBar from '../ProgressBar';

export interface UploadListProps {
  fileList: UploadFile[]
  onRemove?: (file: UploadFile) => void
}

const uploadList: React.FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;

  const handleClick = (file: UploadFile) => {
    if (onRemove) {
      onRemove(file);
    }
  };

  return (
    <ul className="es-upload-files">
      {fileList.map((file) => (
        <li className="es-upload-files-item" key={file.uid}>
          <span className={`es-upload-name es-upload-${file.status}`}>
            <Icon icon="paperclip" className="es-upload-files-icon" />
            {file.name}
          </span>
          <span className="file-status">
            {(file.status === 'uploading' || file.status === 'ready') && <Icon icon="spinner" theme="primary" spin />}
            {file.status === 'success' && <Icon icon="circle-check" theme="success" />}
            {file.status === 'error' && <Icon icon="circle-xmark" theme="danger" />}
          </span>
          <span className="file-action">
            <Icon icon="circle-xmark" onClick={() => handleClick(file)} />
          </span>

          {file.status === 'uploading' && (
            <ProgressBar percent={file.percent ?? 0} style={{ marginTop: '5px' }} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default uploadList;
