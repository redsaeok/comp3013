
export default function About() {

  return (
    <>
    <div className="page-wrap">
      <h1>About DevJokes</h1>
      <p>
        DevJokes is a web application that allows users to share and enjoy jokes related to programming and software development. Whether you're a seasoned developer or just starting out, DevJokes is the perfect place to find a laugh and connect with fellow coders.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Submit your own programming jokes.</li>
        <li>Browse and upvote jokes submitted by others.</li>
        <li>Search for jokes by keywords or categories.</li>
        <li>Responsive design for use on any device.</li>
      </ul>
      <h2>Contact Us</h2>
      <p>If you have any questions, suggestions, or just want to say 
         hi, feel free to reach out to us at 
         <a href="mailto:support@devjokes.com">support@devjokes.com</a>.
      </p>  
    </div>


    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">About</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          A small starter with room to grow.
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          TanStack Start gives you type-safe routing, server functions, and
          modern SSR defaults. Use this as a clean foundation, then layer in
          your own routes, styling, and add-ons.
        </p>
      </section>
    </main>
    </>
  );
}
