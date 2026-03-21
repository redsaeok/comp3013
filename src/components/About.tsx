
export default function About() {

  return (
    <main className="page-wrap px-4 pb-20 mb-20 pt-14">
    <section className="mb-5 border border-gray-200 shadow-xs bg-linear-to-tr from-orange-50 from-40% to-orange-100 rise-in relative overflow-hidden rounded-2xl px-6 py-10 sm:px-10 sm:py-14">
    <div className="page-wrap">
      <h1 className="text-4xl pb-5">About DevJokes</h1>
      <p className="pb-5">
        DevJokes is a web application that allows users to share and enjoy jokes related to programming and software development. Whether you're a seasoned developer or just starting out, DevJokes is the perfect place to find a laugh and connect with fellow coders.
      </p>
      <h2 className="font-bold pb-5">Features</h2>
      <ul className="pb-5 list-disc list-inside">
        <li>Submit your own programming jokes.</li>
        <li>Browse and upvote jokes submitted by others.</li>
        <li>Search for jokes by keywords or categories.</li>
        <li>Responsive design for use on any device.</li>
      </ul>
      <h2 className="font-bold pb-5">Contact Us</h2>
      <p>If you have any questions, suggestions, or just want to say 
         hi, feel free to reach out to us at &nbsp;
         <a href="mailto:support@devjokes.com">support@devjokes.com</a>.
      </p>  
    </div>
    </section>
    </main>
  );
}
