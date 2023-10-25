import { Links, Meta, Outlet, Scripts, useLoaderData } from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { CookieConsent } from "@/components/cookie-consent";
import { TopNav } from "@/components/top-nav";
import { Footer } from "@/components/footer";
import type { SessionUser } from "@/session";

import styles from "./globals.css";

interface LoaderData {
  currentUser: SessionUser | null;
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = function (args): LoaderData {
  return {
    currentUser: (args.context.user as SessionUser) || null,
  };
};

export default function App() {
  const data = useLoaderData<LoaderData>();

  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <TopNav currentUser={data.currentUser} />
        <Outlet />
        <Footer />

        <CookieConsent />
        <Scripts />
      </body>
    </html>
  );
}
