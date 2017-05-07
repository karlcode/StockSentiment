import { h, Component } from 'preact';
import style from './style.less';
import Expand from './expandable.js'


export default class Home extends Component {
	render() {
		return (
			<div>
			<Expand/>
			<div class={style.home}>
				
			</div>
			

			</div>
		);
	}
}
