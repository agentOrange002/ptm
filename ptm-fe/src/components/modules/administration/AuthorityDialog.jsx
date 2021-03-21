import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import _ from 'lodash';
import { DataScroller } from 'primereact/datascroller';

const MyStyle = {
	ButtonStyle: { paddingTop: '10px', paddingBottom: '35px' },
	Button: { marginRight: '.25em', float: 'right', width: '100px' },
	top: { paddingTop: '20px' },
	ttop: { position: 'top' },
	twidth: { width: '100%' },
};

const itemTemplate = (data) => {
	return (
		<div className='item-item'>
			<div className='item-detail'>
				<i className='pi pi-info-circle item-category-icon'></i>
				<span className='item-category'>
					{data.id}:{data.name}
				</span>
			</div>
		</div>
	);
};

class AuthorityDialog extends Component {
	

	closeThis = (event) => {
		event.preventDefault();
		this.props.hidethis();
	};

	render() {
		const { name ,authorities} = this.props.selected;
		return (
			<div>
				<Fieldset legend={'Role:' + name}>
					<div className='p-col-12'>
						<div className='datascroller'>
							<DataScroller value={authorities}  itemTemplate={itemTemplate} rows={100} inline scrollHeight='500px' header='Authorities' />
						</div>
					</div>
				</Fieldset>
				<div className='button' style={MyStyle.ButtonStyle}>
					<span>
						<Button icon='pi pi-check' label='OK' style={MyStyle.Button} onClick={this.closeThis} />
					</span>
				</div>
			</div>
		);
	}
}



export default AuthorityDialog;
