import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@nokia-csf-uxr/csfWidgets';
import '@nokia-csf-uxr/csfWidgets/csfWidgets.css'
import DataFetcher from './DataFetcher';
import CurrencyChart from "./CurrencyChart";

export default class DataGridContainer extends React.Component {
	constructor(props) {
		super(props);
		const columnDefs = [
			{
				headerName: 'Currency',
				field: 'currency',
				width: 90,
				headerCheckboxSelection: true,
				checkboxSelection: true,
				cellRenderer: 'agGroupCellRenderer'},
			{ headerName: 'Code', field: 'code', width: 90},
			{ headerName: 'Date', field: 'date', width: 90 },
			{ headerName: 'Rate', field: 'rate', width: 90 },
		];

		this.state = {
			rowData: []
		};

		this.gridOptions = {
			columnDefs,
			rowAction: {
				types: [
					{
						name: 'edit',
						icon: 'images/ic_edit.svg'
					}
				],
				callback(params) {
					console.log(`-->${params.value.name} ACTION`);
				},
				disable() {
					return false;
				},
			},
			animateRows: true,
			doesDataFlower() {
				// return data.year === 2008;
				return true;
			},
			isFullWidthCell(rowNode) {
				return rowNode.level === 1;
			},
			getRowHeight(params) {
				return params.node.level === 1 ? 350 : 42;
			},

			fullWidthCellRendererFramework: FullWidthCellRenderer,
			rowSelection: 'multiple',
		};
	}
	async componentDidMount() {
		this.fetchData();
	}

	onSelectionChanged = (event) => {
		this.props.onSelectionChanged(event.nativeEvent.data.code, event.nativeEvent.node.selected);
	};

	async fetchData() {
		const currencies = ["usd", "gbp", "eur", "CZK"];
		let fetcher = new DataFetcher();
		let promises =  await currencies.map(async currency => {
			let data = await fetcher.fetchLatestRates(currency);
			return {
				currency: data.currency,
				code: data.code,
				date: data.rates[0].effectiveDate,
				rate: data.rates[0].mid
			}
		});
		Promise.all(promises).then( result => this.setState({rowData: result}) );
	}

	onGridReady = (params) => {
		this.api = params.value.api;
		this.api.sizeColumnsToFit();
	};

	rowGroupOpened = (event) => {
		const params = event.value;
		if (params.node.expanded) {
			this.api.forEachNode((node) => {
				if (node.expanded && node.id !== params.node.id && node.uiLevel === params.node.uiLevel) {
					node.setExpanded(false);
				}
			});
		}
	};

	render() {
		return (
			<div style={{height: 1000}}>
				<DataGrid
					onRowSelected={this.onSelectionChanged}
					onGridReady={this.onGridReady}
					rowGroupOpened={this.rowGroupOpened}
					gridOptions={this.gridOptions}
					rowData={this.state.rowData}
					id="my-datagrid-id"
				/>
			</div>
		);
	}
}

class FullWidthCellRenderer extends React.Component {
	static propTypes = {
		data: PropTypes.arrayOf(PropTypes.shape({
			currency: PropTypes.string.isRequired,
		})).isRequired,
	};

	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<CurrencyChart currencies={[this.props.data.code]}/>
			</div>

		);
	}
}
