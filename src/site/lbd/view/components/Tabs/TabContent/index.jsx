import './index.scss';
import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';

class TabContent extends Component {
	getTabPanes(){
		const { panels, classPrefix, activeIndex, isActive } = this.props;
		return React.Children.map(panels, (child) => {
			if(!child){ return; }
			const order = parseInt(child.props.order, 10);
			const isActive = activeIndex === order;
			return cloneElement(child, {
				classPrefix,
				isActive,
				children: child.props.children,
				key: `tabpane-${order}`
			});
		})
	}
	render(){
		const {classPrefix} = this.props;
		const classes = classnames({
			[`${classPrefix}-content`]: true
		})		
		return (
			<div className={classes}>
				{this.getTabPanes()}
			</div>
		);
	}
}

TabContent.propTypes = {
	//class前缀
	classPrefix: PropTypes.string,
	panels: PropTypes.node,
	activeIndex: PropTypes.number,
	isActive: PropTypes.bool
}

export default TabContent;