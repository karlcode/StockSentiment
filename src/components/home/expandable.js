import { h, Component } from 'preact';
import style from './style.less';
import {VictoryArea, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer, VictoryAxis, VictoryBrushContainer, VictoryZoomContainer, VictoryCandlestick, VictoryChart, VictoryLine } from 'victory';
import Dropdown from 'react-dropdown'

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
var min = []
var max = []
const options = [
  'one', 'two', 'three'
]
const defaultOption = options[0]


export default class Expand extends Component {
	 constructor(props) {
     super(props);
     
     this.state = {
		  data: [],
      min: [],
      max: [],
      value: "FB"
		};
    this.handleChange = this.handleChange.bind(this);
  
	}
	componentDidMount(){
    var data = []
    var min = []
    var max = []
      var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'force-cache' };
  fetch('https://www.quandl.com/api/v3/datasets/WIKI/'+this.state.value+'/data.json?api_key=UXBsxuWqVeC2jAzbA9xe', myInit)
  .then(res => res.json())
  .then(response =>{
    var arr = response.dataset_data.data.reverse()
       var inf = Infinity
       var zer = 0
    //for (var i=1200;i<arr.length;i++){
      for (var i=arr.length-30;i<arr.length;i++){
      data.push(
        {
        x: arr[i][0],
        open: arr[i][1],
        close: arr[i][4],
        high: arr[i][2],
        low: arr[i][3]
      })
      if (arr[i][4]>zer) {
          zer = arr[i][4];
        }
      if (arr[i][4]<inf) {
        inf = arr[i][4];
      }
    }
    this.setState({data:data, min:inf, max:zer})
  })

  }
	handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }

   handleChange(event) {
    this.setState({value: event.target.value});
    this.componentDidMount()
  }

  
	
	render() {
		return (
			<div >
			<div class={style.home}>
        
			</div>
      <VictoryChart width={1200} height={400} 
        theme={VictoryTheme.material}
        
        /*containerComponent={<VictoryZoomContainer
         dimension="x"
          zoomDomain={this.state.zoomDomain}
            onDomainChange={this.handleZoom.bind(this)}/>}*/
            containerComponent={<VictoryVoronoiContainer dimension="x"/>}
            >
        <VictoryArea
      
       domain={{ y: [this.state.min*0.99, this.state.max*1.01]}}
        style={{
            data: {stroke: "tomato", opacity: 0.7, fill:"lightblue"},
  
          }}
        
        labels={(datum) => datum.close}
        labelComponent={<VictoryTooltip renderInPortal text={(datum)=>"Close: "+datum.close}/>}
        data={this.state.data}
          x="x"
            y="open" 
            
            />
         <VictoryAxis
              fixLabelOverlap={true}
              dependentAxis={true}
              tickFormat={(d) => (`$${d}`)}
            />
          <VictoryAxis
              fixLabelOverlap={true}
              dependentAxis={false}
             
            />
       
            
      </VictoryChart> 
     
          <input type="text"  value={this.state.value} onChange={this.handleChange} />
         <Dropdown options={options} value={defaultOption} placeholder="Select an option" />
      {/*<VictoryChart
            padding={{top: 0, left: 65,  bottom: 30}}
            width={1000} height={100}  
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
          </VictoryChart>   */}
			</div>
		);
	}
}
