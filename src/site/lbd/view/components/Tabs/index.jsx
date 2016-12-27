import './index.scss';
import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import TabNav from './TabNav';
import TabContent from './TabContent';
import { is } from 'immutable';

class Tabs extends Component {
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
	//immutable.is进行比较，避免深拷贝与深比较
	shouldComponentUpdate(nextProps, nextState){
		const thisProps = this.props || {};
		const thisState = this.state || {};
		if(Object.keys(thisProps).length !== Object.keys(nextProps).length || Object.keys(thisState).length !== Object.keys(nextState).length){
			return true;
		}
		for(const key in nextProps){
			if(thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])){
				return true;
			}
		}

		for(const key in nextState){
			if(thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])){
				return true;
			}
		}
		return false; 
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

Tabs.propTypes = {
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

Tabs.defaultProps = {
	classPrefix: 'tabs',
	onChange: () => {}
}


export default Tabs;