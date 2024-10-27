import TopBar from '~/react-components/Header/TopBar';

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <TopBar />
            {children}
            <div>Footer</div>
        </>
    );
};

export default GeneralLayout;
