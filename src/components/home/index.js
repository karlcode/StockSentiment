import { h, Component } from 'preact';
import style from './style.less';
import Expand from './expandable.js'


export default class Home extends Component {
	render() {
		return (
			<div>
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
			</div>
			<Expand/>

			</div>
		);
	}
}
