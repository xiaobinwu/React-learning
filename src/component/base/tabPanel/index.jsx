import './index.scss';

import React from 'react';
import Tab from '../tab/index';
import Sticky from '../sticky/index';

class TabPanel extends React.Component {
    constructor(props) {
        super(props);
        let {activeTab} = this.props;
        this.state = {
            activeTab: activeTab || 0
        };
    }
    onTabClick(ev) {
        const index = ev.target.dataset.index;

        if(this.state.activeTab == index){
            return;
        }
        this.setState({
            activeTab: index
        });
    }
    getActiveTab(){
        return this.state.activeTab;
    }
    getTabs(){
        let {tabsClassName} = this.props;
        const panels = this.props.children;
        const wrapperClassName = `tabs-wrapper ${tabsClassName || ''}`;

        return (
            <div className={wrapperClassName} key="tabs-wrapper">
                <Sticky offsetTop={44}>
                    <ul className="tab-items" key="tab-items">
                        {
                            panels.map((panel, index)=>{
                                const isActive = this.state.activeTab == index;
                                return (
                                    <Tab
                                    onTabClick = {this.onTabClick.bind(this)}
                                    key = {index}
                                    isActive = {isActive}
                                    title = {panel.props.title}
                                    url = {panel.props.url}
                                    index = {index}
                                    />
                                )
                            })
                        }
                    </ul>
                </Sticky>
            </div>
            )
    }
    getPanels(){
        const state = this.state;
        const props = this.props;
        const activeTab = state.activeTab;
        const children = props.children;
        const newChildren = [];

        React.Children.forEach(children, (child, index) => {
          const isActive = activeTab == index;
          newChildren.push(React.cloneElement(child, {
            isActive
          }));
        });

        return newChildren;
    }
    render() {
        const tabs = this.getTabs();

        let panels = this.getPanels();
        panels = panels.filter((panel, index)=>{
            return index == this.state.activeTab;
        });

        const contents = [
            tabs,
            panels
        ];

        return (
	        <div className={this.props.wrapperClass}>
                {contents}
            </div>
	    );
    }
}

export default TabPanel;
