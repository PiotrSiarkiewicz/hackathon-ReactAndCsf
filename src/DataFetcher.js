import React, {Component} from 'react';
import axios from 'axios'



function getUrlForCode(code, startDate, endDate) {
	if(arguments.length === 1){
		return `http://api.nbp.pl/api/exchangerates/rates/a/${code}/last/1/?format=json`;
	}else if (arguments.length === 3) {
		return `http://api.nbp.pl/api/exchangerates/rates/a/${code}/${startDate}/${endDate}/?format=json`;
	}
}

export default class DataFetcher extends Component{

	fetchRates = async (code, startDate, endDate) => {
		let response = await fetch(getUrlForCode(code, startDate, endDate));
		let json = await response.json();

		return json;
	};

	fetchLatestRates = async (code) => {
		let response = await fetch(getUrlForCode(code));
		let json = await response.json();

		return json;
	};
}
