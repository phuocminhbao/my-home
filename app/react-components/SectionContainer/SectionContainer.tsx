import { Box } from '@mui/material';

const SectionContainer = ({
    children,
    disablePaddingTopBot = true
}: {
    children: React.ReactNode;
    disablePaddingTopBot?: boolean;
}) => {
    return (
        <Box padding={4} {...(disablePaddingTopBot ? { paddingTop: 0, paddingBottom: 0 } : {})}>
            {children}
        </Box>
    );
};

export default SectionContainer;
