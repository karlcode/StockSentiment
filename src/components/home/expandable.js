import { h, Component } from 'preact';
import style from './style.less';

export default class Expand extends Component {
	constructor() {
        super();
        this.state = {
            data: []
        };
    }
	loadData(){
		fetch('https://www.quandl.com/api/v3/datatables/INQ/EE.json?isin=FI0009000681&api_key=UXBsxuWqVeC2jAzbA9xe')
				.then(res => res.json())
				.then(function(response){
					this.setState({data: response})
			
				}.bind(this))
	}
	componentDidMount(){
		this.loadData()
		this.forceUpdate()
		
	}
	
	render() {
		console.log(this.state.data.datatable)
		return (
			<div>
			<div class={style.home}>
				<h1>Home</h1>
				<p>{this.state.data.datatable}</p>
			</div>
            
			</div>
		);
	}
}
