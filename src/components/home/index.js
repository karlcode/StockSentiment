import { h, Component } from 'preact';
import style from './style.less';
import Expand from './expandable.js'


export default class Home extends Component {
	render() {
		return (
			<div>
			<div class={style.home}>
				
			</div>
			<Expand/>

			</div>
		);
	}
}
