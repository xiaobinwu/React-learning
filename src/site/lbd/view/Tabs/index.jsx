import './index.scss';
import React, { Component, PropTypes, cloneElement } from 'react';
import classnames form 'classnames';
import TabNav from './TabNav';
import TabContent from './TabContent';
// <Tabs classPrefix={'tabs'} defaultActiveIndex={0}>
// 	<TabPane key={0} tab={'Tab 1'}>第一个tab里面的内容</TabPane>
// 	<TabPane key={1} tab={'Tab 2'}>第二个tab里面的内容</TabPane>
// 	<TabPane key={2} tab={'Tab 3'}>第三个tab里面的内容</TabPane>
// </Tabs>

class Tabs extends Component {
	static propTypes = {
		//在主节点上添加可选class
		className: PropTypes.string,
		//class前缀
		classPrefix: PropTypes.string,
		children: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.node),
			PropTypes.node
		]),
		//默认激活索引，组件内更新
		defaultActiveIndex: PropTypes.number,
		//默认激活索引，组件外更新
		activeIndex: PropTypes.number,
		onChange: PropTypes.func
	}
	static defaultProps = {
	  classPrefix: 'tabs',
	  onChange: () => {}
	}
	constructor(props){ 
		super(props);
		// 对事件方法的绑定
		this.handleTabClick = this.handleTabClick.bind(this);
		const currProps = this.props;
		let activeIndex;
		//初始化activeIndex state
		if('activeIndex' in currProps){
			activeIndex = currProps.activeIndex;
		}else if('defaultActiveIndex' in currProps){
			activeIndex = currProps.defaultActiveIndex;
		}
		this.state = {
			activeIndex,
			prevIndex: activeIndex
		}
	}
	componentWillReceiveProps(nextProps){
		//如果props传入activeIndex,则直接更新
		if('activeIndex' in nextProps){
			this.setState({
				activeIndex: nextProps.activeIndex
			})
		}
	}
	handleTabClick(activeIndex){
		const prevIndex = this.state.activeIndex;
		//如果传入的activeIndex与当前activeIndex不一致
		//并且props里面有defaultActiveIndex则更新
		if(this.state.activeIndex !== activeIndex && 'defaultActiveIndex' in this.props){
			this.setState({
				prevIndex,
				activeIndex
			})
		}
		//更新后执行回调函数，抛出当前索引以及上一个历史索引
		this.props.onChange({activeIndex, prevIndex});
	}

	renderTabNav(){
		const { classPrefix, children } = this.props;
		return (
			<TabNav 
				key = "tabBar"
				classPrefix = {classPrefix}
				onTabClick = {this.handleTabClick}
				panels={children}
				activeIndex = {this.state.activeIndex}
			 />
		)
	}
	renderTabContent(){
		const { classPrefix, children } = this.props;
		return (
			<TabContent 
				key = "tabContent"
				classPrefix = {classPrefix}
				panels={children}
				activeIndex = {this.state.activeIndex}
			 />
		)
	}

	render(){
		const {className} = this.props;
		//classnames用于合并class
		const classes = classnames(className, 'ui-tabs');
		return (
			<div className={classes}>
				{this.renderTabNav()}
				{this.renderTabContent()}
			</div>
		);
	}
}

export default Tabs;