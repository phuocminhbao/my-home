import { Typography, TextField } from '@mui/material';
import { useRef, useState, useEffect, createContext } from 'react';
import ConstructionContext from './context/ConstructionContext';

const Construction = ({ children }: { children: React.JSX.Element }) => {
    const constructionNameRef = useRef<HTMLInputElement>(null);
    const [constructionName, setConstructionName] = useState('');

    useEffect(() => {
        if (!constructionNameRef) return;
        constructionNameRef.current?.focus();
    }, []);

    return (
        <>
            <Typography
                variant="h3"
                align="center"
                onClick={() => {
                    if (!constructionNameRef) return;
                    constructionNameRef.current?.focus();
                }}
            >
                BẢNG QUYẾT TOÁN CÔNG TRÌNH
                <TextField
                    fullWidth
                    id="construction-name"
                    inputRef={constructionNameRef}
                    variant="standard"
                    name="constructionName"
                    size="medium"
                    inputProps={{ style: { textAlign: 'center', fontSize: '3em' } }}
                    onBlur={(e) => {
                        setConstructionName(e.target.value);
                    }}
                />
            </Typography>
            <ConstructionContext.Provider value={constructionName}>
                {children}
            </ConstructionContext.Provider>
        </>
    );
};

export default Construction;
