import './index.scss';
import React, { Component, PropTypes, cloneElement } from 'react';
import classnames form 'classnames';

class TabPane extends Component {
	static propTypes = {
		tab: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node
		]).isRequired,
		order: PropTypes.string.isRequired,
		disabled: PropTypes.bool,
		isActive: PropTypes.bool
	}
	render(){
		const { children, classPrefix, className, isActive } = this.props;
		const classes = classnames({
			[className]: className,
			[`${classPrefix}-panel`]: true,
			[`${classPrefix}-active`]: isActive
		});		

		return (
			<div role="tabpanel" className={classes} aria-hidden={isActive}>
				{children}
			</div>
		);
	}
}

export default TabPane;