'use strict';

const chart = new Charty({
	title: 'Circle chart', 
	data: [
		{Stone: 24}, 
		{Wood: 7}, 
		{Steel: 29}
	]
});

const all = new Charty({
	title: 'Pie Chart', 
	data: [
		{All: 38}
	], 
	chartType: 'pie'
});

const ages = new Charty({
	title: 'Ages', 
	data: [
		{'18 - 25': 30}, 
		{'26 - 35': 45}, 
		{'36 - 45': 27}, 
		{'45 - 55': 17}
	]
});