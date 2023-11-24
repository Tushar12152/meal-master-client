
import PropTypes from 'prop-types';

const Title = ({heading}) => {
    return (
        <div>
            <h2 className='text-center font-bold text-3xl text-[#f76042] mt-5'>{heading}</h2>
        </div>
    );
};

Title.propTypes = {
    
};

export default Title;