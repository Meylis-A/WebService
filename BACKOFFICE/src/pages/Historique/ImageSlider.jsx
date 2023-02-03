import { useState } from 'react';

const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderStyle = {
        height: '100%',
        position: 'relative'
    };

    const slidesStyles = {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        // backgroundImage: `url("/test/image (1).jpg")`
        // backgroundColor: 'yellow',

        backgroundImage: `url('${slides[currentIndex]}')`
    };

    const leftArrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50)',
        left: '32px',
        fontSize: '40px',
        color: 'white',
        zIndex: 1,
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: 'none'
    };
    const rightArrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50)',
        right: '32px',
        fontSize: '40px',
        color: 'white',
        zIndex: 1,
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: 'none'
    };

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const previous = (e) => {
        e.preventDefault();
        goToPrevious();
    };

    const goToNext = (e) => {
        e.preventDefault();
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const next = (e) => {
        goToNext();
    };

    return (
        <div style={sliderStyle}>
            
            <button style={leftArrowStyles} onClick={goToPrevious} onKeyDown={previous}>
            ←
            </button>
                
            
            <button style={rightArrowStyles} onClick={goToNext} >
                →
            </button>
            <div style={slidesStyles}></div>
        </div>
    );
};
export default ImageSlider;
