import React from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Error = ({message}) => (
    <div>
        <span>
            <i className="pi pi-times" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
                {message}
        </span>
    </div>
);

const Success = ({message}) => (
    <div>
        <span>
            <i className="pi pi-desktop" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
                {message}
            </span>
    </div>
);

const Info = ({message}) => (
    <div>
        <span>
            <i className="pi pi-desktop" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
                {message}
            </span>
    </div>
);

const Dark = ({message}) => (
    <div>
        <span>
            <i className="pi pi-desktop" style={{paddingLeft: '5px', paddingRight: '5px'}}></i>
                {message}
            </span>
    </div>
);

export const ToastInfo = (message) => toast.info(<Info message={message} />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const ToastSuccess = (message) => toast.success(<Success message={message} />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const ToastError = (message) => toast.error(<Error message={message} />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const ToastDark = (message) => toast.dark(<Dark message={message}/>, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});



