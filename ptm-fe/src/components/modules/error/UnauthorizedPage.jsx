import React, { Component } from 'react';

const MyStyle = {
	height: '80vh',
	textAlign: 'center',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	border: '1px solid ',
};

class UnauthorizedPage extends Component {
	state = {};
	render() {
		return (
			<div className='layout-main-inside'>
				<div className='p-fluid'>
					<div className='p-grid'>
						<div className='p-col-12'>
							<div className='card' style={MyStyle}>
								<h1> 401 - Unauthorized Access to the Page </h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default UnauthorizedPage;
