import React from 'react';
import { Modal, Spin } from 'antd';

export default function AntModalComponents({
    children,
    ModalOpen,
    centered = true,
    setOpen,
    handleCancel,
    loading = false,
    extraFooter = null,
    width = 1000,
    zIndex = 1000,
    closable = true,
    maskClosable = false,
    title = '',
    keyboard = false,
    exrt = "pt-2"
}) {
    return (
        <Modal
            title={title}
            centered={centered}
            open={ModalOpen}
            onOk={() => setOpen(false)}
            onCancel={() => handleCancel(false)}
            width={width}
            zIndex={zIndex}
            closable={closable} // Shows the close button
            footer={extraFooter} // Custom footer if provided
            maskClosable={maskClosable} // Prevents closing by clicking the overlay
            keyboard={keyboard} // Disables closing with the Escape key
            className="!bg-white rounded-lg dark:!bg-navy-900"
        >
            <div className={`${exrt} !bg-white dark:!bg-navy-900`}>
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <Spin size="large" />
                    </div>
                ) : (
                    children
                )}
            </div>
        </Modal>
    );
}
