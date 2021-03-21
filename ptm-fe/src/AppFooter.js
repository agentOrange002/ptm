import React, { Component } from 'react';
//import LogoWhite from '../public/assets/layout/images/logo-white.svg';

const MyStyle = {
    name1: {'marginRight': '5px'},
    name2:{'marginLeft': '5px'},
    color:{backgroundColor:'#4d505b'}
};

export class AppFooter extends Component {
    render() {
        return  (
            <div className="layout-footer" style={MyStyle.color}>
                <span className="footer-text" style={MyStyle.name1}>Payout Team Management</span>
                {/* <img src={LogoWhite} alt="" width="80"/> */}
                <span className="footer-text" style={MyStyle.name2}>@2020 FruitAgents Solutions Inc.</span>
            </div>
        );
    }
}