import React, { Component } from 'react';
import { Card } from 'primereact/card';
import _ from 'lodash';

class BoardVisual1 extends Component {
	state = {};

	renderChart = _.memoize(() => {	
		const BOARDMEMBERS = _.mapKeys(this.props.data, 'memberNumber');
		let result = [];
		let number = 1;		
		for (let i = 1; i <= 5; i++) {
			
			let children = [];

			for (let j = 1; j <= i; j++) {
				children.push(
					<div key={number} className='p-col-2.4'>
						<div className='box'>
							<Card className='cardvisual' title={BOARDMEMBERS[number].memberNumber} subTitle={BOARDMEMBERS[number].boardMemberId}>
								{_.isEmpty(BOARDMEMBERS[number].member) ? 'NONE' : BOARDMEMBERS[number].member.fullName}
							</Card>
						</div>
					</div>
				);				
				++number;				
			}

			result.push(<div key={i} className='p-grid p-justify-center'>{children}</div>);
		}

		return result;
	});

	render() {		
		return (
			<div className="layout-main-inside">
				{(() => this.renderChart())()}
			</div>
		);
	}
}
 
export default BoardVisual1;