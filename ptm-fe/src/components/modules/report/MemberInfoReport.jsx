import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import _ from 'lodash';
import { Messages } from "primereact/messages";
import Axios from "axios";
import { connect } from 'react-redux';

class MemberInfoReport extends Component {
    
    state = { 
        reportBlob: {},
		search: null,
     }

    getPDF = async () => {
		
		await Axios.get(`http://localhost:8080/ptm/api/reports/member/${this.state.search}`, {
			responseType: 'blob',
			headers: {
				'Accept': 'application/pdf',
				'Authorization': this.props.TOKEN
			},
		})
			.then((response) => {
				const file = new Blob([response.data], { type: 'application/pdf', title: 'MemberInfoReport' });
				const fileURL = URL.createObjectURL(file);
				this.setState({ reportBlob: fileURL });
			})
			.catch((error) => {
				//console.log(error);
				this.showError(error.message);
			});
	};

	renderPDF = () => {
		return (
			<div className='p-col-12 p-md-12 p-lg-12 p-col-align-center '>
				<div className='box'>
					<iframe title='Member Info Report' id='memberinforeport' type='application/pdf' src={_.isEmpty(this.state.reportBlob) ? null : this.state.reportBlob} height='700px' width='100%' loading='lazy' />
				</div>
			</div>
		);
	};

	showError(message) {
        let msg = message;
        if(_.isEmpty(message))
            msg = "Error Found";
        this.messages.show({
            sticky: true,
            severity: "error",
            summary: "Error Message :",
            detail: msg
        });
    }

    render() { 
        return ( 
        <div className="layout-main-inside">
			<h5>Member Info Report</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText defaultValue={this.state.search} onChange={(e) => this.setState({search:e.target.value})} placeholder="Enter Member ID:" />
                </span>
				<Button 
					style={{marginLeft:'20px'}}
					label="Generate Report" 
					className="p-button-info" 
					icon="pi pi-file-pdf" 
					disabled={_.isEmpty(this.state.search) ? true: false}
					onClick={this.getPDF}
					/>
					<Messages ref={el => (this.messages = el)}></Messages>
            {(() => this.renderPDF())()}
        </div> 
        );
    }
} 

const mapStateToProps = state => {
	return {
		TOKEN: state.LOGIN_AUTHENTICATION.loginState.loginResponse.authorization,
	};		
};

export default connect(mapStateToProps, null)(MemberInfoReport);