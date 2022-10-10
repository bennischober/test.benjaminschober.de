import type { MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type {Post} from './posts'
import {getPosts} from './posts'

export const loader = getPosts; 

import rootStyles from './styles/root.css';

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links = () => {
  return [{ rel: "stylesheet", href: rootStyles}];
};

export default function App() {
  const posts:Post[] = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ul className="nav-menu">
          <li>
            <NavLink 
              to="/posts" 
              className={({isActive}) => isActive? "current" : ""}>
                Posts
            </NavLink>
          </li>
          <li>
              <NavLink 
                to="/admin"
                className={({isActive}) => isActive? "current" : ""}
                >
                Admin section
              </NavLink>
          </li>
        </ul>
        <div className="container">
          <Outlet />
          <div>
      <h1>Posts</h1>
       <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link to={"/posts/" + post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}