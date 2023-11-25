
import PropTypes from 'prop-types';

const Title = ({heading}) => {
    return (
        <div>
            <h2 className='text-center font-bold text-3xl text-[#f76042] border-b-2 w-72 mx-auto pb-4'>{heading}</h2>
        </div>
    );
};

Title.propTypes = {
    heading:PropTypes.node,
};

export default Title;