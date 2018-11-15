import React, {Component} from 'react';
<<<<<<< HEAD
import CurrencyChart from './CurrencyChart'
import "@nokia-csf-uxr/csfWidgets/csfWidgets.css"
import ChartConfig from "./ChartConfig";
import {Tabs, Tab } from  '@nokia-csf-uxr/csfWidgets'
import './app.css'
import './'
import DataGridContainer from "./DataGridContainer";

export default class App extends Component {

	constructor(){
		super();
		this.state = {
			currencies: ['usd'],
			checkboxCurrencies: ['USD'],
		};
	}


	render() {
		return <div>
			<Tabs alignment="left">
				<Tab id="basicTab1" label="Currency chart">
					<div className="app-container">
						<ChartConfig currencyUpdate={this.onCurrencyUpdate} currencies={this.state.checkboxCurrencies}/>
						<CurrencyChart currencies={this.state.currencies}/>
					</div>
				</Tab>
				<Tab id="basicTab2" label="Table">
					<DataGridContainer onSelectionChanged={this.onSelectionChanged}/>
				</Tab>
			</Tabs>
		</div>
	}

	onCurrencyUpdate = currencies => {
		this.setState(() => ({currencies}), () => console.log(this.state.currencies))
	};

	onSelectionChanged = (code, selected) => {
		let temp = this.state.checkboxCurrencies;
		if(selected){

			let finded = temp.find( stateCode =>{
				return stateCode === code;
			});
			if(finded === undefined){
				temp.push(code)
				this.setState({
					checkboxCurrencies: temp
				})
			}
		}else {
			let checkboxCurrencies = temp.filter( stateCode => stateCode !== code );
			if(checkboxCurrencies !== undefined){
				this.setState({checkboxCurrencies})
			}else {
				this.setState({
					checkboxCurrencies: []
				})
			}
		}
	}
=======

export default class App extends Component {
    render() {
        return (
            <div className={"App"}>
                Hello, world!
            </div>
        );
    }
>>>>>>> parent of a85dcb3... initial data grid component
}
