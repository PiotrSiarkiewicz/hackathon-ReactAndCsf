import "@nokia-csf-uxr/csfWidgets/csfWidgets.css"
import {LineChart, TextInput} from '@nokia-csf-uxr/csfWidgets'
import DataFetcher from './DataFetcher'
import React, {Component} from "react";

export default class CurrencyChart extends Component{

	constructor(){
		super();
		this.state = {
			data:{},
			startDate: "2018-11-02",
			endDate: "2018-11-10"
		}
	}

	componentDidMount() {
		this.fetchDataAndDeriveState();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps === this.props)
			return;

		this.fetchDataAndDeriveState();
	}

	async fetchDataAndDeriveState() {
		let currenciesData = [];
		let currencies = this.props.currencies === undefined ? [] : this.props.currencies;
		const fetcher = new DataFetcher();
		for (let currency of currencies) {
			let response = await fetcher.fetchRates(currency,this.state.startDate, this.state.endDate);
			response.rates.map(r => ({date: r.effectiveDate, [currency]: r.mid})).forEach(d => {
				let found = currenciesData.find(c => c.date === d.date);
				if (found) {
					let index = currenciesData.indexOf(found);
					currenciesData[index] = {...found, ...d};
				}
				else
					currenciesData.push(d)
			})
		}
		this.setState(() => ({data: currenciesData}))
	}

	render() {
		return (
			<div>
				<div className="inline-div">
					<TextInput  text={this.state.startDate} id="TextInputID" placeholder="start date" label="From" focus onChange={this.onStartDateChange}/>
				</div>
				<div className='inline-div'>
					<TextInput  text={this.state.endDate} id="TextInputID2" placeholder="end date" label="To" focus onChange={this.onEndDateChange}/>
				</div>
				<LineChart
					title={"Currencies"}
					data={this.state.data} xDataKey={"date"}
					yDataKey={this.props.currencies} yLabel={"Mid rate"}
					xLabel={"Date"}
					yTickFormatter={value => parseFloat(value).toFixed(2)}/>
			</div>
		);
	}

	onStartDateChange = time => {
		this.setState({
			startDate: time.value
		},() =>this.fetchDataAndDeriveState());
	};

	onEndDateChange = time => {
		this.setState({
			endDate: time.value
		},() =>this.fetchDataAndDeriveState());
	};
}
