
import PropTypes from 'prop-types';

const Title = ({heading}) => {
    return (
        <div>
            <h2 className='lg:text-center font-bold lg:text-3xl text-[#f76042] lg:border-b-2 lg:w-72 mx-auto pb-4'>{heading}</h2>
        </div>
    );
};

Title.propTypes = {
    heading:PropTypes.node,
};

export default Title;