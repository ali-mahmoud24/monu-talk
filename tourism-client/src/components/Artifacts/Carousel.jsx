import Carousel from 'react-material-ui-carousel';

function ImageCarousel({ images }) {
  return (
    <Carousel
      height={300}
      autoPlay
      stopAutoPlayOnHover
      swipe
      cycleNavigation
      // fullHeightHover
      indicators={false}

      // indicatorIconButtonProps={{
      //   style: {
      //     padding: '3px', // 1
      //     color: '#fff', // 3
      //   },
      // }}
      // activeIndicatorIconButtonProps={{
      //   style: {
      //     // backgroundColor: 'red', // 2
      //   },
      // }}

      // indicatorContainerProps={{
      //   style: {
      //     marginTop: '-20px', // 5
      //   },
      // }}
    >
      {images.map((src, i) => (
        <img key={i} width={'100%'} height={300} src={src} alt="" />
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
