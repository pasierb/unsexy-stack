import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import { Button } from "@/components/ui/button";

import styles from "./globals.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Hello world!</h1>
        <Button>Click me</Button>

        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}
