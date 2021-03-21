import React from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';

const MyStyle = {
	breadcrumbBG: {
		borderStyle: 'solid',
		backgroundColor: '#edf0f5',
		color: '#edf0f5',
	},
	breadcrumb: {
		background: '#edf0f5',
		borderColor: '#edf0f5',
	},
};

const CustomBreadCrumb = ({model,home}) => {
    return (  
        <div style={MyStyle.breadcrumbBG}>
			<BreadCrumb style={MyStyle.breadcrumb} model={model} home={home} />
		</div>
    );
}
 
export default CustomBreadCrumb;