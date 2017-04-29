import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<h1>Stock Sentiment</h1>
				<nav>
					<Link href="/">Homo</Link>
					<Link href="/profile">Me</Link>
					<Link href="/profile/john">Karl</Link>
				</nav>
			</header>
		);
	}
}
