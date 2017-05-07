import { h, Component } from 'preact';
import style from './style.less';
import { VictoryAxis, VictoryBrushContainer, VictoryZoomContainer, VictoryCandlestick, VictoryChart, VictoryLine } from 'victory';


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
	componentDidMount(){
      var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'force-cache' };
  fetch('https://www.quandl.com/api/v3/datasets/WIKI/FB/data.json?api_key=UXBsxuWqVeC2jAzbA9xe', myInit)
  .then(res => res.json())
  .then(response =>{
    var arr = response.dataset_data.data.reverse()
    for (var i=1230;i<arr.length;i++){
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
	handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }
	
	render() {

		return (
			<div >
			<div class={style.home}>
        
			</div>
      <VictoryChart width={1000} height={400} 
        containerComponent={<VictoryZoomContainer
       
        dimension="x"
          zoomDomain={this.state.zoomDomain}
            onDomainChange={this.handleZoom.bind(this)}/>}>
        <VictoryLine  data={this.state.data} x="x"
         y="open" />
         <VictoryAxis
              fixLabelOverlap={true}
              
              
            />
            
      </VictoryChart> 
      <VictoryChart
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
            width={1000} height={100} scale={{x: "time"}} 
            containerComponent={
              <VictoryBrushContainer responsive={false}
                dimension="x"
                selectedDomain={this.state.selectedDomain}
                onDomainChange={this.handleBrush.bind(this)}
                selectionStyle={{fill: "teal", opacity: 0.2}}
              />
            }
          >
            
            <VictoryLine
              style={{
                data: {stroke: "tomato"}
              }}
              data={this.state.data} x="x"
         y="open"
            />
            <VictoryAxis
              fixLabelOverlap={true}
              
              
            />
          </VictoryChart>    
			</div>
		);
	}
}
