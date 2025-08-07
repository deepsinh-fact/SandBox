import React, { useEffect, useState } from "react";
import { Upload, Button, message, Typography } from "antd";
import { UploadOutlined, LoadingOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { TBSelector } from "Store/Reducers/TBSlice";
import { UpdateProfile } from "Store/Reducers/TBSlice";
const { Title } = Typography;

export default function UploadPhoto({ setIsModalOpen }) {
    const [fileList, setFileList] = useState([]);
    const { UsersigninData, isUpdateProfile, isUpdateProfileFetching, UpdateProfileData } = useSelector(TBSelector);
    const dispatch = useDispatch();

    // Validate file type
    const validateFileType = (file) => {
        const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
        if (!allowedTypes.includes(file.type)) {
            message.error("You can only upload PNG, JPG, or JPEG files.");
            return false;
        }
        return true;
    };

    const handleUploadChange = ({ file, fileList: newFileList }) => {
        if (validateFileType(file)) {
            setFileList(newFileList);
        }
    };
    const handleUpload = async () => {
        if (!fileList.length) {
            message.error("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append("image_1920", file.originFileObj);
        });
        formData.append("login", UsersigninData?.data?.email);
        dispatch(UpdateProfile(formData));
    };


    useEffect(() => {
        if (isUpdateProfile) {
            setIsModalOpen(false);
            // const updatedProfile = JSON.parse(localStorage.getItem("loginDataSave"));
            // if (updatedProfile && UpdateProfileData.data?.image) {
            //     updatedProfile.data.image = UpdateProfileData.data.image;
            //     localStorage.setItem("loginDataSave", JSON.stringify(updatedProfile));
            // }
            // dispatch(updateState({ isUpdateProfile: false, UsersigninData: updatedProfile, UpdateProfileData: {} }));
            fileList.length = 0;
        }
    }, [isUpdateProfile, UpdateProfileData, dispatch, fileList]);

    return (
        <div className="flex flex-col items-center space-y-6">
            {/* Title */}
            <Title level={4} className="text-xl font-semibold">
                Upload Image
            </Title>

            {/* Upload Component */}
            <Upload
                accept=".png,.jpg,.jpeg"
                listType="picture-card"
                fileList={fileList}
                onChange={handleUploadChange}
                beforeUpload={() => false} // Prevent auto-upload
                className="border border-dashed border-gray-300 rounded-lg p-4 transition-all hover:shadow-lg"
            >
                {fileList.length >= 1 ? null : (
                    <div className="text-center">
                        <UploadOutlined className="text-3xl text-gray-500 mb-2 hover:scale-105 transition-transform" />
                        <p className="text-sm text-gray-600">Click or Drag to Upload</p>
                    </div>
                )}
            </Upload>

            {/* Submit Button */}
            <Button
                type="primary"
                onClick={handleUpload}
                loading={isUpdateProfileFetching}
                icon={isUpdateProfileFetching ? <LoadingOutlined /> : <CheckCircleOutlined />}
                disabled={!fileList.length || isUpdateProfileFetching}
                className={`w-full max-w-xs px-4 py-2 rounded-lg transition-all ${isUpdateProfileFetching
                    ? "bg-gray-500 hover:bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                    }`}
            >
                {isUpdateProfileFetching ? "Uploading..." : "Upload"}
            </Button>
        </div>
    )
}