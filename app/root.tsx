import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    isRouteErrorResponse,
    useRouteError
} from '@remix-run/react';

import roboto300 from '@fontsource/roboto/300.css';
import roboto400 from '@fontsource/roboto/400.css';
import roboto500 from '@fontsource/roboto/500.css';
import roboto700 from '@fontsource/roboto/700.css';

export const links: LinksFunction = () => [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { rel: 'stylesheet', href: roboto300 },
    { rel: 'stylesheet', href: roboto400 },
    { rel: 'stylesheet', href: roboto500 },
    { rel: 'stylesheet', href: roboto700 }
];

export const meta: MetaFunction = () => {
    return [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ];
};

export const ErrorBoundary = () => {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        let message;
        switch (error.status) {
            case 401:
                message = (
                    <p>
                        Oops! Looks like you tried to visit a page that you do not have access to.
                    </p>
                );
                break;
            case 404:
                message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>;
                break;

            default:
                throw new Error(error.data || error.statusText);
        }

        return (
            <>
                <h1>
                    {error.status}: {error.statusText}
                </h1>
                {message}
            </>
        );
    }

    if (error instanceof Error) {
        console.error(error);
        return (
            <div>
                <h1>There was an error</h1>
                <p>{error.message}</p>
                <hr />
                <p>Hey, developer, you should replace this with what you want your users to see.</p>
            </div>
        );
    }

    return <h1>Unknown Error</h1>;
}

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
