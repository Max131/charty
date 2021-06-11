
// Write Javascript code!
class Charty{
  constructor({title = 'New Chart', chartType = 'circle', data = [{Test: 5}], precision = false, selector = 'body' }) {
    this.chartType = chartType;
    this.title = title;
    this.precision = false;
    this.selector = selector;
    this.id = new Date().getTime();
    this.data = [...data];
    this.percents = [];
    this.angles = [];

    this.calculatePercents(this.data);
    this.draw();
  }

  addData({ name, value }) {
    const newData = Object.fromEntries([[name, value]]);
    this.data = [...this.data, newData];
    this.calculatePercents(this.data);
    this.draw();
  };

  calculatePercents(data) {
    const totalItems = data.length;
    const totalCount = data.reduce((acc, obj) => acc + +Object.values(obj), 0);

    this.percents = [
      ...this.data.map(obj =>
        Math.round((+Object.values(obj) * 100) / totalCount)
      )
    ];

    this.calculateAngles(this.percents);
  };

  calculateAngles(data) {
    this.angles = [...data.map(value => Math.floor((value * 360) / 100))];
    for (let i = 1; i < this.angles.length; ++i) {
      this.angles[i] += this.angles[i - 1];
    }
  };

  getColor(index) {
    const colors = [
      'purple',
      'midnightblue',
      'blue',
      'cyan',
      'magenta',
      'yellow',
      'dimgray',
      'orange',
      'brown',
      'indigo',
      'pink',
      'gold'
    ];
    return colors[index];
  };

  draw(appendSelector) {
    const selector = appendSelector || this.selector;
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


const myChart = new Charty({title: 'Pets', selector: '#app'});
myChart.addData({ name: 'Dogs', value: 8 });
myChart.addData({ name: 'Cats', value: 3 });
myChart.addData({ name: 'Birds', value: 11 });
myChart.addData({ name: 'Fishes', value: 9 });
myChart.addData({ name: 'Butterflies', value: 19 });

// myChart.draw('#app');



const obj = new Charty({title: 'Insects', selector: '#app'});
// obj.draw();


const x = new Charty(
  {
    title: 'New Test', 
    chartType: 'Pie', 
    data: [{Oranges: 23}, {Apples: 44}, {Guavas: 33}],
    selector: '#app'
  }
);

x.addData({name: 'Grapes', value: 77});
