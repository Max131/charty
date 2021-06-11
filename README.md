# Charty, a small library for charts

Charty is a simple library to draw pie and circle charts. Just that, simple to use. 

To use it, just link de library with `<script src="charty.js">` and between the `<header>` tag link the css file `<link rel="stylesheet" rel="charty.css"` (you can define your own css).

![Charty Example](charty.png)

## How to start using.

```javascript
const chart = new Charty({}) //for a empty chart

const chart = new Charty({ //With options, every one is optionl but data
    title: 'My Chart',		//The title of the chart
    chartType: 'circle',	//The type of chart, circle or pie
    data: [					//An array of objects int he format name/value
        {Apples: 45},		//{Name: Value}
        {Oranges: 37},
        {Bananas: 52}
    ],
    precision: false,		//If the data chart have float numbers
    selector: '#app'		//Where the chart will be inserted, must be a valid css selector (default to body)
})
```



## Add aditional data

The charts accept insert additional data with the next function:

```javascript
chart.addData({"Name", Value}) //Name: String, Value: Integer
```

**The chart will  be redrawn after insert data**



## Manipulate the chart

If you want to manipulate the chart's DOM, you can do it throught the ID of the chart, every chart have a data-chart-id attribute, and every chart hav a unique ID.

```javascript
const DIV = document.querySelector(`[data-chart-id="${chart.id}"]`)
//Remove the background gradient
DIV.style.backgroundImage = 'none'
//The background will be changed
DIV.style.backgroundColor = 'lightyellow'
```

**By default the charts have a light gradient**



## Change chart's colors

By default the colors are static, if you want to change they, yo must edit the file `charty.js` and change the colors array in the `getColor` function.

```javascript
getColor(index) {
    const colors = [
      'purple', //Change these colors
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
```



If this small library is useful for you or liked you, consider to donate a small amount in thankfulness trought [Paypal](https://www.paypal.com/donate?hosted_button_id=NZ9Z8YDHSMMEC&source=url) :smile:

<form action="https://www.paypal.com/donate" method="post" target="_top">
<input type="hidden" name="hosted_button_id" value="NZ9Z8YDHSMMEC" />
<input type="image" src="https://www.paypalobjects.com/es_XC/i/btn/btn_donate_SM.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
<img alt="" border="0" src="https://www.paypal.com/es_MX/i/scr/pixel.gif" width="1" height="1" />
</form>

