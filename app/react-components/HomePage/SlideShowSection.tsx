import FullScreenImage from '../CustomImage/FullScreenImage';
import Carousel from '../Carousel/Carousel';

const SlideShowSection = () => {
    return (
        <Carousel IndicatorIcon={false} navButtonsAlwaysInvisible={false} indicators={false}>
            <FullScreenImage
                src="https://placehold.co/2881x1401"
                mobileImgSrc="https://placehold.co/748x748"
                isLinkImg
                href="/about"
                title="Title of hero page"
                caption="Caption of hero page, which we want customers to be impresive first"
            />
            <FullScreenImage
                src="https://placehold.co/2880x1400"
                mobileImgSrc="https://placehold.co/747x747"
                isLinkImg
                href="/about"
                title="Title of hero page"
                caption="Caption of hero page, which we want customers to be impresive first"
            />
        </Carousel>
    );
};

export default SlideShowSection;
