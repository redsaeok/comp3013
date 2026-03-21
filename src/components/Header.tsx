import { Link } from "@tanstack/react-router";
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
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] bg-linear-to-r from-orange-100 to-orange-50  px-4 backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
        <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2"
          >
            <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#F59E0B,#F97316)]" />
            <span className="text-black font-bold">DevJokes</span>
          </Link>
        </h2>

        <div className="order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-2 sm:w-auto sm:flex-nowrap sm:pb-0">

          <Link
            to="/"
            className="nav-link"
            activeProps={{ className: "nav-link is-active" }}
          >
            Home
          </Link>


          {!session ? (
            <span
              className="text-gray-400 cursor-not-allowed pointer-none pointer-events-none"
            >
              Add Joke
            </span>
          ) : (
            <Link
              to="/addjoke"
              className="nav-link"
              activeProps={{ className: "nav-link is-active" }}
            >
              Add Joke
            </Link>
          )}



          <Link
            to="/about"
            className="nav-link"
            activeProps={{ className: "nav-link is-active" }}
          >
            About
          </Link>



        </div>


        <div className="order-4 ml-auto flex items-right gap-2" >
          {!session ? (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-gray-400 no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2 shadow-lg inset-shadow-sm hover:bg-gray-100"
              activeProps={{ className: "nav-link is-active" }}
            >
              <span className="text-gray-500">Sign In</span>
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
              className="inline-flex items-center gap-2 rounded-full text-white px-3 py-1.5 text-sm bg-linear-to-b from-amber-500 to-amber-700 no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] shadow-xl inset-shadow-sm  sm:px-4 sm:py-2 hover:from-amber-800 hover:to-amber-800"
              activeProps={{ className: "nav-link is-active" }}
            >
              <span className="text-white">Sign Up</span>
            </Link>
          ) : (
            <button 
              onClick={handleClickLogout} 
              className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] dark:text-[var(--seak-ink)] no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2"
            >
              Sign Out
            </button>
          )}



        </div>
      </nav>
    </header>
  );
}
