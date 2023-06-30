import React, { ChangeEventHandler, useRef, useState } from 'react';
import axios, { AxiosHeaderValue, CancelTokenSource } from 'axios';
import UploadList from './uploadList';
import Dragger from './dragger';

const { CancelToken } = axios;

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

export interface UploadFile {
  /** 文件唯一 id */
  uid: string;
  /** 文件的大小 */
  size: number;
  /** 文件名 */
  name: string;
  /** 文件的状态 */
  status?: UploadFileStatus;
  /** 0 到 100 的数字 */
  percent?: number;
  /** 文件对象 */
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  /** 表单字段名 */
  name?: string;
  /** 上传地址 */
  action: string;
  /** 自定义请求头 */
  headers?: { [key: string]: AxiosHeaderValue };
  /** 自定义请求数据 */
  data?: { [key: string]: any };
  /** 是否携带 cookies */
  withCredentials?: boolean;
  /** 默认文件列表 */
  defaultFileList?: UploadFile[];
  /** 上传的文件类型 */
  accept?: string;
  /** 是否可多选 */
  multiple?: boolean
  /** 是否支持拖动上传 */
  drag?: boolean;
  children?: React.ReactNode;
  /** 获取上传进度 */
  onProgress?: (percentage: number, file: File) => void;
  /** 上传成功回调 */
  onSuccess?: (data: any, file: File) => void;
  /** 上传错误回调 */
  onError?: (data: any, file: File) => void;
  /** 文件上传之前的钩子，参数为即将上传的文件，返回 false 和 Promise reject 则上传失败 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /** 上传成功或失败的回调 */
  onChange?: (file: File) => void;
  /** 文件被删除时调用 */
  onRemove?: (file: UploadFile) => void;
}

export const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    name,
    data,
    headers,
    accept,
    multiple,
    drag,
    children,
    withCredentials,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const uploadManager = useRef(new Map<string, CancelTokenSource>());

  const updateFileList = (file: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList((prevList) => prevList.map((item) => {
      if (item.uid === file.uid) {
        return { ...file, ...updateObj };
      }
      return item;
    }));
  };

  const post = (file: File) => {
    const source = CancelToken.source();
    const fileTemp: UploadFile = {
      uid: `${Date.now()}-upload-file`,
      status: 'ready',
      name: file.name,
      size: file.size,
      raw: file,
    };
    uploadManager.current.set(fileTemp.uid, source);
    setFileList((prevList) => [...prevList, fileTemp]);
    const form = new FormData();
    form.append(name ?? 'file', file);
    if (data) {
      Object.keys(data).forEach((key) => {
        form.append(key, data[key]);
      });
    }
    axios.post(action, form, {
      cancelToken: source.token,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers,
      },
      withCredentials,
      onUploadProgress(progressEvent) {
        const { loaded, total } = progressEvent;
        if (!total) {
          return;
        }
        const percentage = Math.round((loaded / total) * 100) / 100;
        updateFileList(fileTemp, {
          status: 'uploading',
          // 处理浮点精度问题
          percent: parseFloat((percentage * 100).toFixed(2)),
        });
        onProgress?.(percentage, file);
      },
    }).then((res) => {
      updateFileList(fileTemp, {
        status: 'success',
        response: res,
      });
      onSuccess?.(res, file);
    }).catch((err) => {
      updateFileList(fileTemp, {
        status: 'error',
        error: err.message,
      });
      onError?.(err.message, file);
    }).finally(() => {
      onChange?.(file);
    });
  };

  const uploadFiles = (files: FileList) => {
    const fileArr = Array.from(files);
    fileArr.forEach((file) => {
      if (beforeUpload) {
        const result = beforeUpload(file);
        if (result instanceof Promise) {
          result.then(post);
        } else if (result !== false) {
          post(file);
        }
      }
      post(file);
    });
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleRemove = (file: UploadFile) => {
    if (file.status === 'uploading') {
      const source = uploadManager.current.get(file.uid);
      source?.cancel();
    }
    if (onRemove) {
      onRemove(file);
    }
    setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
  };

  return (
    <div className="es-upload">
      <div className="es-upload-input" onClick={handleClick} aria-hidden>
        {drag ? (
          <Dragger onFile={uploadFiles}>
            {children}
          </Dragger>
        ) : children}
      </div>
      <input ref={inputRef} type="file" onChange={handleChange} accept={accept} multiple={multiple} data-testid="es-upload-input" />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

Upload.defaultProps = {
  name: 'file',
};

export default Upload;
