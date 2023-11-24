
import PropTypes from 'prop-types';

const Container = ({children})=> {
    return (
        <div className='w-[96%] mx-auto '>
            {children}
        </div>
    );
};

Container.propTypes = {
    children:PropTypes.any,
};

export default Container;