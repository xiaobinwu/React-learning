import './index.scss';
import React from 'react';
import JobItem from '../jobItem/index';
import CandidateItem from '../candidateItem/index';

let ListItem = (props) => {
    let { className = '', item, type } = props;
    className += ' lbd-list-item ';

    function goToPage() {
        if(!type) {
            return null;
        }

        let newUrl;
        if (type === 'jobList') {
            newUrl = `/Mobile/Job/${item.id}?clientAction=push`
        }else if (type === 'candidateList') {
            newUrl = `/Mobile/Recommendation/${item.id}?clientAction=push`
        }

        window.location.href = newUrl
    }

    return (
        <li className={className} onTouchTap={goToPage}>
            {(()=> {
                switch (type) {
                    case 'jobList':
                        return <JobItem item={item} />;
                    case 'candidateList':
                        return <CandidateItem item={item} />;
                    default:
                        return null;
                }
            })()}
        </li>
    )
};

ListItem.propTypes = {

}

export default ListItem;
