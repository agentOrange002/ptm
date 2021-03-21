import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';
import { InputTextarea } from 'primereact/inputtextarea';

const MyStyle = {
	ButtonStyle: { paddingTop: '10px', paddingBottom: '35px' },
	Button: { marginRight: '.25em', float: 'right', width: '150px' },
	top: { paddingTop: '20px' },
	ttop: { position: 'top' },
	twidth: { width: '100%' },
};

class CategoryInfoDialog extends Component {
	state = {};

	componentDidMount() {
		//console.log(' Category Data:' + JSON.stringify(this.props.data));
	}

	closeThis = (event) => {
		event.preventDefault();
		this.props.hidethis();
	};

	render() {
		return (
			<>
				<Fieldset legend='Category Details'>
					<div className='p-grid p-fluid'>
                        <div className='p-col-6 p-md-6' style={MyStyle.top}>
                            <label htmlFor='id'>ID:</label>
                            <InputText id='id' type='text' value={this.props.data.id} />
                        </div>
                        <div className='p-col-6 p-md-6' style={MyStyle.top}>
                            <label htmlFor='categoryId'>Category ID:</label>
                            <InputText id='categoryId' type='text' value={this.props.data.categoryId} />
                        </div>
                        <div className='p-col-6 p-md-6' style={MyStyle.top}>
                            <label htmlFor='categoryName'>Category Name:</label>
                            <InputText id='categoryName' type='text' value={this.props.data.categoryName} />
                        </div>
                        <div className='p-col-6 p-md-6' style={MyStyle.top}>
                            <label htmlFor='registeredDate'>Date Registered:</label>
                            <InputText id='registeredDate' type='text' value={this.props.data.registeredDate} />
                        </div>
                        <div className='p-col-12 p-md-12'>
						<label htmlFor='categoryDescription'>Category Description:</label>
						    <InputTextarea id='categoryDescription' rows={5} cols={30} type='text' value={this.props.data.categoryDescription} />
					    </div>
                    </div>
				</Fieldset>
				<div className='button' style={MyStyle.ButtonStyle}>
					<span>
						<Button icon='pi pi-check' label='OK' style={MyStyle.Button} onClick={this.closeThis} />
					</span>
				</div>
			</>
		);
	}
}

export default CategoryInfoDialog;
