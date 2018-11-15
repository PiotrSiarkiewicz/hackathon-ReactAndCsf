import React, {Component} from 'react';
import '@nokia-csf-uxr/csfWidgets/csfWidgets.css'
import {CheckBox} from '@nokia-csf-uxr/csfWidgets'

export default class ChartConfig extends Component{
	state = {
		currencies: [{name:'USD', value: true}]
	};

	onChange = e => {
		const {value, data} = e;
		this.setState(state => ({
			currencies: [...state.currencies.filter(c => c.name !== data.name), {
				name: data.name,
				value: value
			}]
		}), () => this.props.currencyUpdate(this.state.currencies.filter(c => c.value === true).map(c => c.name).reduce((a, b) => [...a, b], [])))
	};

	getCurrentValueForCurrency = code => {
		let currency = this.state.currencies.find(c => c.name === code);
		if (currency)
			return currency.value;
		else
			return false;
	};

	render() {
		if(this.props.currencies.length > 0) {
			return <div>
				{ this.props.currencies.map( (currency, i) =>{
					return (
						<CheckBox
							key={i}
							eventData={{name: currency}}
							value={this.getCurrentValueForCurrency(currency)}
							label={currency.toUpperCase()}
							onChange={this.onChange}/>)
				})}
			</div>
		}else{return <div></div>}
	}
}

