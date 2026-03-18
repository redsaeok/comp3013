import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";
import { authClient } from "#/lib/auth-client";
import { useNavigate } from "@tanstack/react-router";


export default function Header() {

  const navigate = useNavigate();
  const { data: session } = authClient.useSession();

  function handleClickLogout() {
    if (session) {
      authClient.signOut().then(() => {
        navigate({ to: "/" });
      });
    } else {
      // if we don't have a session, just navigate to login
      navigate({ to: "/" });
    }
  }


  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
        <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2"
          >
            <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#56c6be,#7ed3bf)]" />
            DevJokes
          </Link>
        </h2>

        <div className="ml-auto flex items-center gap-1.5 sm:ml-0 sm:gap-2">
          <ThemeToggle />
        </div>

        <div className="order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-2 sm:w-auto sm:flex-nowrap sm:pb-0">
          <Link
            to="/addjoke"
            className="nav-link"
            activeProps={{ className: "nav-link is-active" }}
          >
            Add Joke
          </Link>

          <Link
            to="/about"
            className="nav-link"
            activeProps={{ className: "nav-link is-active" }}
          >
            About
          </Link>

          <Link
            to="/"
            className="nav-link"
            activeProps={{ className: "nav-link is-active" }}
          >
            Home
          </Link>

        </div>


        <div className="order-4 ml-auto flex items-right gap-2" >
          {!session ? (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2"
              activeProps={{ className: "nav-link is-active" }}
            >
              Sign In
            </Link>
          ) : (
            <span 
              className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2"
            >
              {session.user.email}
            </span>
          )}

          {!session ? (
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] text-[var(--chip-bg)] px-3 py-1.5 text-sm bg-[var(--sea-ink)] no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2"
              activeProps={{ className: "nav-link is-active" }}
            >
              Sign Up
            </Link>
          ) : (
            <button 
              onClick={handleClickLogout} 
              className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2"
            >
              Sign Out
            </button>
          )}



        </div>
      </nav>
    </header>
  );
}
