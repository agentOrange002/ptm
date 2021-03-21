import React, { useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';


const BoardMemberVisual = props => {
    const [selection, setSelection] = useState([]);
    const BOARDMEMBERS = _.mapKeys(props.data,'memberNumber');   
    const data1 = [{
        label: '1',
        type: 'person',
        className: 'p-person',
        expanded: true,
        data: { 
            name: BOARDMEMBERS[1].member === null ? "1 BOARD MEMBER NONE" : BOARDMEMBERS[1].member.fullName , 
        },
        children: [
            {
                label: '2',
                type: 'person',
                className: 'p-person',
                expanded: true,
                data: { 
                    name: BOARDMEMBERS[2].member === null ? "2 BOARD MEMBER NONE" : BOARDMEMBERS[2].member.fullName, 
                },
                children: [{
                    label: '4',
                    type: 'person',
                    className: 'p-person',
                    expanded: true,
                    data: { 
                        name: BOARDMEMBERS[4].member === null ? "4 BOARD MEMBER NONE" : BOARDMEMBERS[4].member.fullName, 
                    },
                },
                {
                    label: '5',
                    type: 'person',
                    className: 'p-person',
                    expanded: true,
                    data: { 
                        name: BOARDMEMBERS[5].member === null ? "5 BOARD MEMBER NONE" : BOARDMEMBERS[5].member.fullName, 
                    },
                }],
            },
           
            {
                
                    label: '3',
                    type: 'person',
                    className: 'p-person',
                    expanded: true,
                    data: { 
                        name: BOARDMEMBERS[3].member === null ? "3 BOARD MEMBER NONE" : BOARDMEMBERS[3].member.fullName, 
                    },
                    children: [{
                        label: '6',
                        type: 'person',
                        className: 'p-person',
                        expanded: true,
                        data: { 
                            name: BOARDMEMBERS[6].member === null ? "6 BOARD MEMBER NONE" : BOARDMEMBERS[6].member.fullName, 
                        },
                    },
                    {
                        label: '7',
                        type: 'person',
                        className: 'p-person',
                    expanded: true,
                    data: { 
                        name: BOARDMEMBERS[7].member === null ? "7 BOARD MEMBER NONE" : BOARDMEMBERS[7].member.fullName, 
                    },
                    }],
                }
        ]
    }];

  

    const nodeTemplate = (node) => {
        if (node.type === "person") {
            return (
                <div>
                    <div className="node-header">{node.label}</div>
                    <div className="node-content">                       
                        <div>{node.data.name}</div>
                    </div>
                </div>
            );
        }

        if (node.type === "department") {
            return node.label;
        }
    }

    return (
			
				<div className='organizationchart-demo'>
					<div className='card'>
						<h2>Board Members</h2>
						<OrganizationChart
							value={data1}
							nodeTemplate={nodeTemplate}
							selection={selection}
							selectionMode='multiple'
							onSelectionChange={event => setSelection(event.data)}
							className='company'></OrganizationChart>
						
					</div>
				</div>                  
			
		);
}

export default BoardMemberVisual;