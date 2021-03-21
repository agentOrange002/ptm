import React, { Component } from 'react';
import SupportDashboard from './SupportDashboard';
import { BreadCrumb } from 'primereact/breadcrumb';
import history from "../../../routes/history";

const MyStyle = { 
  breadcrumbBG:{     
      borderStyle: 'solid',
      backgroundColor:'#edf0f5',
      color:'#edf0f5'
  },
  breadcrumb:{
      background:'#edf0f5',
      borderColor:'#edf0f5'    
  }
}

const urlparam = `${window.location.origin}/#/app/`;

class Dashboard extends Component {  
    state = {
      breadcrumdItems: [
          { label: 'Dashboard',url: `${urlparam}`},            
      ],
      home: {
          icon: 'pi pi-home', command: () => { history.push('/app/'); }
      },
    }
    render() { 
        return ( 
          <>
          <div style={MyStyle.breadcrumbBG}>
            <BreadCrumb style={MyStyle.breadcrumb} model={this.state.breadcrumdItems} home={this.state.home} />
          </div>
          <div className='layout-main-inside'>
            <div className="p-grid p-fluid dashboard">
                <SupportDashboard />            
            </div>
          </div>
          </>
        );
    }
}
 
export default Dashboard;