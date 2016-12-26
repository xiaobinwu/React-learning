import './index.scss';
import React from 'react';
import ReactDom from 'react-dom';
import Tabs from '../components/Tabs/index';
import TabPane from '../components/Tabs/TabPane/index';

class AppComponent extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<Tabs classPrefix={'tabs'} defaultActiveIndex={0} className="tabs">
				<TabPane key={0} tab={'Tab 1'} order={0}>第一个tab里面的内容</TabPane>
				<TabPane key={1} tab={'Tab 2'} order={1} disabled={true}>第二个tab里面的内容</TabPane>
				<TabPane key={2} tab={'Tab 3'} order={2}>第三个tab里面的内容</TabPane>
			</Tabs>
		);
	}
}

ReactDom.render(
	<AppComponent />,
	document.getElementById('app'),
	() => { console.log('tab success') }
);