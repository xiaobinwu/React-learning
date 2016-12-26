import './index.scss';
import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';

class TabPane extends Component {
	render(){
		const { children, classPrefix, className, isActive } = this.props;
		const classes = classnames({
			[className]: className,
			[`${classPrefix}-panel`]: true,
			[`${classPrefix}-panel-active`]: isActive
		});		

		return (
			<div role="tabpanel" className={classes} aria-hidden={isActive}>
				{children}
			</div>
		);
	}
}

TabPane.propTypes = {
	tab: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]).isRequired,
	order: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	isActive: PropTypes.bool
}

export default TabPane;