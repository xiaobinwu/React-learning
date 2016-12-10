import './index.scss';
import React from 'react';

let Footer = (props) => {
    return (
        <div className={props.prefix}>
            {props.children}
        </div>
    )
};

Footer.propTypes = {
    prefix: React.PropTypes.string,
    children: React.PropTypes.node
}

Footer.defaultProps = {
    prefix: 'lbd-footer'
}

export default Footer;
