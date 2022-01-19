import { useState } from 'react';

import Heart from 'react-heart'
const NASAData = (props) => {
    const [active, setActive] = useState(false)

    // 
    // 
    // 
    // 
    console.log('we are inside NASAData', props)
    return (
        <div className='nasa-data' key={props.item.data[0].nasa_id}>
            <h3>{props.item.data[0].title}</h3>
            <p>Location: {props.item.data[0].location}</p>
            <p>Created: {props.item.data[0].date_created}</p>
            <img className='nasa-img' src={props.item.links?.[0].href} alt="" />
            <p>Description: {props.item.data[0].description}</p>
            <Heart className='heart' isActive={active} onClick={() => setActive(!active)} />
        </div>
    );
}


export default NASAData;
