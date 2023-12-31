import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import { setExpensesDetails } from '@/redux/reducerSlice/Expenses';
import { useDispatch } from 'react-redux';
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  const ImageUpload = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const dispatch = useDispatch()
    const handleChange = (info) => {
      
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
         dispatch(setExpensesDetails(info.file.originFileObj))
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
      }
    };
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </div>
    );
    return (
      <>
        <Upload
          name="receipt"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="receipt"
              style={{
                width: '100%',
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </>
    );
  };
  export default ImageUpload;
  
