import React from 'react';
import LoadingBar from 'react-redux-loading-bar'

const HeaderProgressBar = (props) => {   
    return(<LoadingBar scope={props.nameofbar} style={{ backgroundColor: '#073b63', height: '6px'}}/>);
}

export default HeaderProgressBar;