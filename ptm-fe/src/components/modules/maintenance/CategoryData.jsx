import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getAllCategories } from '../../../redux/actions/CategoryActions';
import UILoader from '../tools/UILoader';
import { ContextMenu } from 'primereact/contextmenu';
import { Dialog } from 'primereact/dialog';
import CategoryInfoDialog from './CategoryInfoDialog';

const MyStyle = {
	id: { width: '150px' },
	categoryId: { width: '250px' },
	categoryName: { width: '350px'},
	categoryDescription: { width: '550px'},
	categoryType: { width: '250px' },
	registeredDate: { width: '250px' },	
	DialogStyle : {width: '50vw', borderStyle: 'solid', borderColor: 'white', borderWidth: '1px'},
};

class CategoryData extends Component {

	state = { 
        categories: null,
        selectedCategory: null,
		menu: [
            {
                label: 'View Category', 
                icon: 'pi pi-fw pi-ticket', 
                command: (event) => this.viewCategory(this.state.selectedCategory)
            }            
        ],
		categoryInfoDialog: false,
		category: null,
    };

	viewCategory(category) {
       this.setState({category: category});
	   this.setState({categoryInfoDialog:true});
    }

	hideCategoryInfoDialog = () => {
		this.setState({ categoryInfoDialog: false });
	};

	hideContext = () => {
        this.setState({ selectedCategory: null });
    }

    componentDidMount() {
		if(_.isEmpty(this.props.CATEGORIES)) {
			this.props.getAllCategories();
		}        
    }

    refreshTable = async (event) => {
        event.preventDefault(); 
        await this.props.getAllCategories();
    }	

	displaySelection(data) {
		if (!data || data.length === 0) {
			return <div style={{ textAlign: 'left' }}>No Selection</div>;
		} else {
			if (data instanceof Array)
				return (
					<ul style={{ textAlign: 'left', margin: 0 }}>
						{data.map((category, i) => (
							<li key={category.categoryId}>{category.categoryId + ' - ' + category.categoryName + ' - ' + category.categoryType + ' - ' + category.registeredDate}</li>
						))}
					</ul>
				);
			else return <div style={{ textAlign: 'left' }}>Selected Member: {data.categoryId + ' - ' + data.categoryName + ' - ' + data.categoryType + ' - ' + data.registeredDate}</div>;
		}
	}

	render() {
		const paginatorLeft = <Button icon='pi pi-refresh' onClick={this.refreshTable} />;
		return (
			<div>
				<div className='content-section implementation'>
				<ContextMenu model={this.state.menu} ref={el => this.cm = el} onHide={this.hideContext} />
                <UILoader blockui="MEMBER_LOADING" unblockui={["MEMBER_GET_ALL","MEMBER_ERROR"]}>
					<DataTable
						value={this.props.CATEGORIES}
						sortField='id'
						sortOrder={-1}
						scrollable={true}
						selectionMode='single'
						header='Category Data Table'
						footer={this.displaySelection(this.state.selectedCategory)}
						selection={this.state.selectedCategory}
						onSelectionChange={e => this.setState({ selectedCategory: e.value })}
						paginator={true}
						paginatorLeft={paginatorLeft}
						paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
						currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
						rows={10}
						rowsPerPageOptions={[5, 10, 20]}
						contextMenuSelection={this.state.selectedCategory} 
                        onContextMenuSelectionChange={e => this.setState({ selectedCategory: e.value })}
                        onContextMenu={e => this.cm.show(e.originalEvent)}>
						<Column field='id' header='ID' style={MyStyle.id}/>
						<Column field='categoryId' header='Category ID' style={MyStyle.categoryId}/>
						<Column field='categoryName' header='Category Name' style={MyStyle.categoryName}/>
						<Column field='categoryDescription' header='Category Description'  style={MyStyle.categoryDescription}/>
						<Column field='categoryType' header='Category Type' style={MyStyle.categoryType}/>
						<Column field='registeredDate' header='Date Registered' style={MyStyle.registeredDate}/>										
					</DataTable>
                </UILoader>
				<Dialog id='categoryinfo' header='Category Information' visible={this.state.categoryInfoDialog} style={MyStyle.DialogStyle} modal={true} onHide={this.hideCategoryInfoDialog}>
					<CategoryInfoDialog hidethis={this.hideCategoryInfoDialog} data={this.state.category} />
				</Dialog>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		CATEGORIES: Object.values(state.CATEGORIES.categoriesResponse),
	};
};

const mapDispatchToProps = { getAllCategories };

export default connect(mapStateToProps, mapDispatchToProps)(CategoryData);
