import { Button, Upload } from 'antd'
import React from 'react'
import { InboxOutlined } from '@ant-design/icons';
import Card from 'components/card';
import { useNotificationContext } from 'createContextStore/NotificationContext';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { GetFileLogListByUserName } from 'Store/Reducers/TBSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TBSlice } from 'Store/Reducers/TBSlice';
import { TBSelector } from 'Store/Reducers/TBSlice';
import TableComponents from 'components/ant/TableComponents';
import ListTable from './ListTable';
import CONFIG from 'Config';


const { Dragger } = Upload;
export default function UploadGST() {
    const [uploadType, setUploadType] = React.useState('GST');
    const [fileList, setFileList] = React.useState([]);
    const { openNotification } = useNotificationContext();
    const [ip, setIP] = React.useState('');
    const [loading, setLoading] = React.useState(false); // Add loading state
    const { isMe, isGetFileLogListByUserNameFetching, GetFileLogListByUserNameData } = useSelector(TBSelector);
    const dispatch = useDispatch();
    const path = useLocation()?.search?.split("=")[1];
    React.useEffect(() => {
        if (path === "gst") {
            setUploadType("GST");
        } else if (path === "cin") {
            setUploadType("CIN");
        } else if (path === "iec") {
            setUploadType("IEC");
        } else if (path === "darpandin") {
            setUploadType("DARPAN");
        }
    }, []);

    const beforeUpload = (file) => {
        const isValid = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel'
        ].includes(file.type) ||
            ['.xlsx', '.xls'].some(ext => file.name.endsWith(ext));

        if (!isValid) {
            openNotification(
                "error",
                "Error",
                "You can only upload XLS or XLSX files!",
                true,
                true
            );
        }
        return isValid || Upload.LIST_IGNORE;
    };



    const handleChange = ({ fileList: newList }) => {
        setFileList(newList.slice(-1));
    }
    const props = {
        name: 'file',
        multiple: false,
        accept: ".xlsx,.xls",
        beforeUpload: beforeUpload,
        onChange: handleChange,
        showUploadList: true,
        fileList: fileList,
    };
    React.useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then((response) => response.json())
            .then((data) => {
                setIP(data.ip);
            })
            .catch((error) => console.error('Error', error));
    }, []);
    const handleSubmit = async () => {
        if (fileList.length === 0) {
            openNotification("error", "Error", "Please select files to upload", true, true);
            return;
        }
        setLoading(true);
        // Create a new FormData object to append the file and other data
        const formData = new FormData();


        // Append the files to FormData
        formData.append('file', fileList[0].originFileObj, fileList[0].name);
        formData.append('ModuleType', uploadType);
        formData.append('FileName', fileList[0].name);
        formData.append('IPAddress', ip);
        formData.append('ActionType', "Import");
        formData.append('UserName', isMe?.email);

        // Define API paths configuration
        const apiPaths = [
            { name: "GST", path: "GST", type: "ImportGSTExcel", port: "83" },
            { name: "CIN", path: "CIN", type: "ImportCINDirectorExcel", port: "84" },
            { name: "IEC", path: "IEC", type: "ImportIECExcel", port: "93" },
            { name: "DARPAN", path: "Darpan", type: "ImportDarpanExcel", port: "5003" }
        ];

        // Get the correct API path based on uploadType
        const apiPath = apiPaths.find((item) => item.name === uploadType);
        if (!apiPath) {
            throw new Error(`Invalid upload type: ${uploadType}`);
        }

        // Define the API endpoint with port 84 to match the curl command
        const apiUrl = `${CONFIG.BASE_URL_ALL}/${apiPath.path}/${apiPath.type}`;
        try {
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': '*/*',
                },
                onUploadProgress: (progressEvent) => {
                    console.log(`Upload progress: ${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%`);
                }
            });

            console.log('Server response:', response.data);
            if (response.status === 200) {
                openNotification("success", "Success", `Total  Records Files uploaded successfully`, true, true);
                ApiCall();
                setFileList([]);
            } else {
                openNotification("error", "Error", response.data.message || "File upload failed", true, true);
                setFileList([]);
            }
        } catch (error) {
            let errorMessage = "An error occurred while uploading the files";
            if (error.response) {
                errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
                console.error('Server response:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error configuration:', error.message);
            }
            openNotification("error", "Error", errorMessage, true, true);
            console.error('Error during file upload:', error);
        } finally {
            setLoading(false); // Set loading to false after the request completes (either success or failure)
        }
    }
    const ApiCall = () => {
        dispatch(
            GetFileLogListByUserName({
                userName: isMe?.email,
            })
        );
    };
    React.useEffect(() => {
        if (isMe?.email) {
            ApiCall()
        }
    }, [isMe]);
    return (
        <div className="mb-2 grid grid-cols-1 gap-x-4 gap-y-5 px-0 py-3  xl:grid-cols-1">
            <Card extra="px-6 py-10">
                <div className='flex flex-wrap justify-between items-center gap-5'>
                    <div className="flex flex-wrap justify-end items-center">
                        <h2 className="text-navy-600 text-2xl dark:text-white font-semibold">Upload : {uploadType}</h2>
                    </div>
                    <div className="flex flex-wrap justify-end items-center">
                        <select className="p-2 bg-white dark:bg-navy-700 dark:text-white w-40 border border-gray-300 rounded" onChange={(e) => setUploadType(e.target.value)} value={uploadType}>
                            <option value="GST">GST</option>
                            <option value="CIN">CIN</option>
                            <option value="IEC">IEC</option>
                            <option value="DARPAN">DARPAN</option>
                        </select>
                    </div>
                </div>
                <div className="p-3"></div>
                <DraggerCss>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="dark:!text-white ant-upload-text">Click or drag files to this area to upload</p>
                        <p className="dark:!text-white ant-upload-hint">
                            {uploadType === 'GST'
                                ? 'Upload GST user data files (XLSX)'
                                : uploadType === 'CIN' ? 'Upload CIN user data files (XLSX)'
                                    : uploadType === 'IEC' ? 'Upload IEC user data files (XLSX)'
                                        : 'Upload DARPAN user data files (XLSX)'}
                        </p>
                    </Dragger>
                </DraggerCss>
                <Button
                    type="primary"
                    size="large"
                    className="mt-10 dark:!text-white"
                    loading={loading}
                    onClick={handleSubmit}
                    disabled={fileList.length === 0}
                >
                    Submit Files
                </Button>
            </Card>
            <Card extra="px-6 py-10">
                <div className='flex flex-wrap justify-between items-center gap-5'>
                    <div className="flex flex-wrap justify-end items-center">
                        <h2 className="text-navy-600 text-2xl dark:text-white font-semibold">User Upload List</h2>
                    </div>
                </div>
                <div className="py-5">
                    <ListTable data={GetFileLogListByUserNameData?.filter((item) => item.actionType === "Import")} loading={isGetFileLogListByUserNameFetching} />
                </div>
            </Card>
        </div>
    )
}

const DraggerCss = styled.div`
:where(.css-dev-only-do-not-override-mc1tut).ant-upload-wrapper .ant-upload-list.ant-upload-list-picture .ant-upload-list-item-error,
:where(.css-dev-only-do-not-override-mc1tut).ant-upload-wrapper .ant-upload-list.ant-upload-list-picture-card .ant-upload-list-item-error,
:where(.css-dev-only-do-not-override-mc1tut).ant-upload-wrapper .ant-upload-list.ant-upload-list-picture-circle .ant-upload-list-item-error {
    border-color: green !important;
}

:where(.css-dev-only-do-not-override-ut69n1).ant-upload-wrapper .ant-upload-list .ant-upload-list-item-error .ant-upload-list-item-name,
:where(.css-dev-only-do-not-override-ut69n1).ant-upload-wrapper .ant-upload-list .ant-upload-list-item-error .ant-upload-icon .anticon {
    color: green !important;

}

:where(.css-dev-only-do-not-override-mc1tut).ant-upload-wrapper .ant-upload-list .ant-upload-list-item-error .ant-upload-list-item-name,
:where(.css-dev-only-do-not-override-mc1tut).ant-upload-wrapper .ant-upload-list .ant-upload-list-item-error .ant-upload-icon .anticon {
    color: green;
}

:where(.css-dev-only-do-not-override-mc1tut).ant-upload-wrapper .ant-upload-list .ant-upload-list-item-error .ant-upload-list-item-actions .anticon,
:where(.css-dev-only-do-not-override-mc1tut).ant-upload-wrapper .ant-upload-list .ant-upload-list-item-error .ant-upload-list-item-actions .anticon:hover {
    color: green;
}
`