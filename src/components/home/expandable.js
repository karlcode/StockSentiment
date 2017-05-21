import { h, Component } from 'preact';
import style from './style.less';
import {VictoryLabel, VictoryArea, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer, VictoryAxis, VictoryBrushContainer, VictoryZoomContainer, VictoryCandlestick, VictoryChart, VictoryLine } from 'victory';
import Autosuggest from 'react-autosuggest';
import theme from './style.less';

var myHeaders = new Headers({
  "Access-Control-Allow-Origin": "*, *",
});
var data = []
var min = []
var max = []

const languages = [

  {
    ticker: 'MSFT',
    name: 'Microsoft'
  },
  {
    ticker: 'MSM',
    name: '1972'
  },
  {
    ticker: 'TSLA',
   name: 'Tesla Motors Inc'
  },
  {
    ticker: 'FB',
    name: 'Facebook'
  },
  {
    ticker: 'Elm',
   name: 'Elm'
  }
];
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input element
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.ticker;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);
export default class Expand extends Component {
	 constructor(props) {
     super(props);
     
     this.state = {
		  data: [],
      min: [],
      max: [],
      suggestions: [],
      value: ''
		};

  
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
    fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?api_key=08545c90b96a4aafbaba352d72abba71?q=facebook', myInit)
    .then(res => res.json())
    .then(response =>{
      console.log(response)
    })
  }

	handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }
   onChange = (event, { newValue, method }) => {
    switch (method){
      case 'type':
      this.setState({
      value: newValue
      });
      break
      case 'click':
      this.setState({
      value: newValue
      });
      this.componentDidMount()
      break
      default:
      break
    }
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

	
	render() {
     const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Type in a ticker',
      value,
      onChange: this.onChange
    };
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
           <VictoryLabel x={50} y={24} style={{textAnchor: "start",
              verticalAnchor: "end",
              fill: "#000000",
              fontFamily: "inherit",
              fontSize: "20px",
              fontWeight: "bold"}}
                text={this.state.value}
              />
        <VictoryArea
        
       domain={{ y: [this.state.min*0.99, this.state.max*1.01]}}
        style={{
            data: {stroke: "tomato", opacity: 0.7, fill:"lightblue"},
  
          }}
        
        labels={(datum) => datum.close}
        labelComponent={<VictoryTooltip renderInPortal text={(datum)=>"Close: "+datum.close}/>}
        data={this.state.data}
          x="x"
            y="close" 
            
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
      <Autosuggest
        theme={theme}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      
         
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
