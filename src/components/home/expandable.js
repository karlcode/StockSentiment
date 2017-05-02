import { h, Component } from 'preact';
import style from './style.less';
import { VictoryZoomContainer, VictoryCandlestick, VictoryChart, VictoryLine } from 'victory';


var data2 = [
    {x: 3, open: 5, close: 10, high: 15, low: 0},
    {x: 2, open: 10, close: 15, high: 20, low: 5},
    {x: 4, open: 15, close: 20, high: 25, low: 10},
    {x: 1, open: 15, close: 20, high: 40, low: 10}
  ]
  var myHeaders = new Headers({
  "Access-Control-Allow-Origin": "*, *",
});
var data = []


export default class Expand extends Component {
	 constructor(props) {
     super(props);

     this.state = {
		  data: []
		};
	}
	componentWillMount(){
      var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };
  fetch('https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?api_key=UXBsxuWqVeC2jAzbA9xe', myInit)
  .then(res => res.json())
  .then(response =>{
    var arr = response.dataset_data.data
    for (var i=1200;i<arr.length;i++){
      data.push(
        {
        x: arr[i][0],
        open: arr[i][1],
        close: arr[i][4],
        high: arr[i][2],
        low: arr[i][3]
      })
    }
    this.setState({data:data})
  })

  }
	
	
	render() {

		return (
			<div >
			<div class={style.home}>
        
			</div>
      <VictoryChart containerComponent={<VictoryZoomContainer/>}>
        <VictoryLine  data={this.state.data} x="x"
         y="open" />
      </VictoryChart>     
			</div>
		);
	}
}
