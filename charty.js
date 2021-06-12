/**
*  Charty a circle & pie chart small library.
* @author: Mario Abreu
*/

/** @class Charty representing a chart*/
class Charty{
/**
 * Creates an instance of Charty.
 *
 * 
 * 
 * @constructor
 * @param {string} title The title of the chart
 * @param {string} chartType The type of chart circle|pie
 * @param {array} data An array of objects in the pair format: name/vale {name: value}
 * @param {boolean} precision Determines wheter the chart have decimal precision or not
 * @param {string} selector The html element where the chart will be insert, must be a valid css selector
 */
  constructor({title = 'New Chart', chartType = 'circle', data = [{Test: 5}], precision = false, selector = 'body' }) {
    this.chartType = chartType;
    this.title = title;
    this.precision = precision;
    this.selector = selector;
    this.id = `${Math.floor(Math.random()*10000)}`;
    this.data = [...data];
    this.percents = [];
    this.angles = [];

    this.calculatePercents(this.data);
    this.draw();
  }

/**
 * Insert new data in a chart
 * 
 * @param {string} name The name of the data to insert
 * @param {int} value The value of the data to insert
 */
  addData({ name, value }) {
    const newData = Object.fromEntries([[name, value]]);
    this.data = [...this.data, newData];
    this.calculatePercents(this.data);
    this.draw();
  };

/**
 * Calculate the individual percentage of every data
 * 
 * @param {array} data An array of the initial values for a chart
 */
  calculatePercents(data) {
    const totalItems = data.length;
    const totalCount = data.reduce((acc, obj) => acc + +Object.values(obj), 0);

    this.percents = [
      ...this.data.map(obj =>{
          if(!this.precision){
            return Math.round((+Object.values(obj) * 100) / totalCount);
          }
          else{
            return ((+Object.values(obj) * 100) / totalCount).toFixed(2);
          }
      })
    ];

    this.calculateAngles(this.percents);
  };

/**
 * Calculate the angles of the gradient for every data
 * 
 * @param {array} data An array of the data in the chart
 */
  calculateAngles(data) {
    this.angles = [...data.map(value => Math.floor((value * 360) / 100))];
    for (let i = 1; i < this.angles.length; ++i) {
      this.angles[i] += this.angles[i - 1];
    }
  };

/**
 * Return a color for a piece of the chart
 * 
 * @param {int} index A integer to get a color
 * @return {string} Th color in the array to return
 */
  getColor(index) {
    const colors = [
      '#E6A57E',
      '#BEB4C5',
      '#D0BCAC',
      '#E5DB9C',
      '#F5BFD2',
      '#D5E4C3',
      '#C47482',
      '#E5B3BB',
      '#C54B6C',
      '#C6C9D0',
      '#A15D98',
      '#9C9359 '
    ];
    return colors[index];
  };

/**
 * Draw a chart and insert it in a element of the DOM
 * 
 */
  draw() {
    const selector = this.selector;
    let gradient;
    if (this.angles.length !== 1) {
      gradient = this.angles.reduce(
        (acc, curr, index) =>
          acc +
          `${this.getColor(index)} ${curr}deg, ${this.getColor(
            index + 1
          )} ${curr}deg, `,
        ''
      );
      let tempGradient = gradient.split(', ');
      tempGradient = tempGradient.slice(0, tempGradient.length - 2);
      gradient = tempGradient.join(', ');
    }
    else {
      gradient = `${this.getColor(0)} 0deg, ${this.getColor(0)} 360deg`;
    }

    const chart = document.createElement('DIV');
    const title = document.createElement('H2');
    const chartGraph = document.createElement('DIV');
    const chartData = document.createElement('DIV');
    const chartPercents = document.createElement('P');

    chart.setAttribute('class', 'chart');
    title.setAttribute('class', 'chart__title');
    title.textContent = this.title;
    chartGraph.setAttribute('class', `chart__graph chart__${this.chartType}`);
    chartGraph.style.backgroundImage = `conic-gradient(${gradient})`;
    chartData.setAttribute('class', 'chart__data');
    chartPercents.setAttribute('class', 'chart__percents');

    this.percents.forEach((percent, index) => {
      const chartPercent = document.createElement('SPAN');
      const chartPiece = document.createElement('I');
      chartPercent.textContent = `${percent}%`;
      chartPercent.setAttribute('class', 'chart__percent');
      chartPiece.setAttribute('class', 'chart__piece');
      chartPiece.style.backgroundColor = this.getColor(index);
      chartPercent.appendChild(chartPiece);
      chartPercents.appendChild(chartPercent);
    });
    chartData.appendChild(chartPercents);

    this.data.forEach((data, index) => {
      const chartDataRow = document.createElement('P');
      const chartDataName = document.createElement('SPAN');
      const chartDataValue = document.createElement('SPAN');
      const chartPiece = document.createElement('I');
      chartDataRow.setAttribute('class', 'chart__dataRow');
      chartDataName.setAttribute('class', 'chart__dataName');
      chartDataValue.setAttribute('class', 'chart__dataValue');
      chartDataName.textContent = Object.keys(data)[0];
      chartDataValue.textContent = Object.values(data)[0];
      chartPiece.setAttribute('class', 'chart__piece');
      chartPiece.style.backgroundColor = this.getColor(index);
      chartDataValue.appendChild(chartPiece);
      chartDataRow.appendChild(chartDataName);
      chartDataRow.appendChild(chartDataValue);
      chartData.appendChild(chartDataRow);
    });

    chart.appendChild(title);
    chart.appendChild(chartGraph);
    chart.appendChild(chartData);
    chart.dataset.chartId = this.id;

    const existId = document.querySelector(`[data-chart-id="${this.id}"]`);
    if(existId){
      existId.parentNode.replaceChild(chart, existId);
    }
    else
    { 
      document.querySelector(selector).appendChild(chart);
    }
  };
}
