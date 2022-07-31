import React from 'react';

const Filter = ({ filter, setFilter }) => {
    return ( 
        <span style={{color: "white"}} className="input-group mb-3 white">
            {/* Buscar: {' '} */}
            <div className='row'>
                <div className='col-12'>
                <input value={filter || ''}
                onChange ={(e) => setFilter(e.target.value)}
                className="form-control "
                placeholder='Buscar'/>
                </div>
            </div>
        </span>
     );
}
 
export default Filter;