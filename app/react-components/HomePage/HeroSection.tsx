import FullScreenImage from '../CustomImage/FullScreenImage';

const HeroSection = () => {
    return (
        <FullScreenImage
            src="https://placehold.co/2880x1400"
            mobileImgSrc="https://placehold.co/747x747"
            isLinkImg
            href="/about"
            title="Title of hero page"
            caption="Caption of hero page, which we want customers to be impresive first"
        />
    );
};

export default HeroSection;
