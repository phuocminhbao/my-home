import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    isRouteErrorResponse,
    useRouteError
} from '@remix-run/react';

import roboto300 from '@fontsource/roboto/300.css?url';
import roboto400 from '@fontsource/roboto/400.css?url';
import roboto500 from '@fontsource/roboto/500.css?url';
import roboto700 from '@fontsource/roboto/700.css?url';

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

const ErrorContent = () => {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        let message;
        switch (error.status) {
            case 401:
                message = (
                    <div>
                        Oops! Looks like you tried to visit a page that you do not have access to.
                    </div>
                );
                break;
            case 404:
                message = (
                    <div>Oops! Looks like you tried to visit a page that does not exist.</div>
                );
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
                <>{error.message}</>
                <hr />
                <p>Hey, developer, you should replace this with what you want your users to see.</p>
            </div>
        );
    }

    return <h1>Unknown Error</h1>;
};

export function ErrorBoundary() {
    // const error = useRouteError();
    return (
        <html lang="en">
            <head>
                <title>Something went wrong haha</title>
                <Meta />
                <Links />
            </head>
            <body>
                {/* add the UI you want your users to see */}
                <ErrorContent />
                <Scripts />
            </body>
        </html>
    );
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
            </body>
        </html>
    );
}
