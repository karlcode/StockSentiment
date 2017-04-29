import { h, Component } from 'preact';
import style from './style.less';

export default class Expand extends Component {
	render() {
		return (
			<div>
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
			</div>
			</div>
		);
	}
}
