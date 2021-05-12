import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { Fieldset } from 'primereact/fieldset';
import { Dialog } from 'primereact/dialog';
import _ from 'lodash';
import { Messages } from 'primereact/messages';
import UILoader from '../tools/UILoader';
import Axios from 'axios';
import { getRecruitmentByRecruitmentId } from '../../../redux/actions/RecruitmentActions';

const MyStyle = {
	Panel: { paddingBottom: '1em' },
	DivButton: { paddingTop: '10px', paddingBottom: '35px' },
	Button: { marginRight: '.25em', float: 'right', width: '170px' },
	image: { display: 'block', marginRight: 'auto', marginLeft: 'auto', paddingBottom: '1em' },
	imageBorder: { borderStyle: 'solid', borderRadius: '150px', width: '50%', borderColor: 'black' },
	h3: { textAlign: 'center' },
	width: { width: '170px' },
	fileupload: { display: 'block', marginRight: 'auto', marginLeft: 'auto', width: '110px', paddingBottom: '1em' },
	span: { textAlign: 'center', display: 'block', marginRight: 'auto', marginLeft: 'auto', width: '200px', paddingBottom: '1em' },
	DialogStyle: { width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px' },
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

class RecruitmentInfo extends Component {
	state = {};

	componentDidMount() {}

	onClickUpdate = () => {};

	addMembersRecruited = () => {};

	renderInformation = () => {
		return <h1>wawawwee</h1>;
	};

	renderRecruited = () => {
		return <h1>wawawwee</h1>;
	};

	render() {
		return (
			<div className='p-grid '>
				<div className='p-col-12'>
					<Messages ref={(el) => (this.messages = el)}></Messages>
					<TabView style={{ marginLeft: '0' }} activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({ activeIndex: e.index })}>
						<TabPanel header='Recruitment Information' leftIcon='pi pi-fw pi-user'>
							<Fieldset legend='Member Profile'>{this.renderInformation()}</Fieldset>
							<div className='button' style={MyStyle.DivButton}>
								<span>
									<Button icon='pi pi-save' label='Update Profile' style={MyStyle.Button} onClick={this.onClickUpdateProfile} />
								</span>
							</div>
						</TabPanel>
						<TabPanel header='Members Recruited' leftIcon='pi pi-fw pi-list'>
							<Fieldset legend='Member Address'>{this.renderRecruited()}</Fieldset>
							<div className='button' style={MyStyle.DivButton}>
								<span>
									<Button icon='pi pi-plus' label='Add Address' style={MyStyle.Button} onClick={this.addMembersRecruited} />
								</span>
							</div>
						</TabPanel>
					</TabView>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { recruitmentId } = ownProps.match.params;
	return {
		RECRUITMENTS: state.RECRUITMENTS.recruitmentsResponse[recruitmentId],
		FETCHTYPE: state.RECRUITMENTS.fetchType,
		ERROR: state.RECRUITMENTS.fetchError,
		ERROR_MESSAGE: state.RECRUITMENTS.fetchErrorMessage,
	};
};

const mapDispatchToProps = { getRecruitmentByRecruitmentId };

export default connect(mapStateToProps, mapDispatchToProps)(RecruitmentInfo);
