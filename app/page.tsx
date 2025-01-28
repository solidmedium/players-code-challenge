export default function Home() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="px-2">
        <h1 className="text-4xl font-bold md:text-6xl">
          Welcome to <span className="text-primary">Players</span>
        </h1>
        <p className="mt-3 text-xl md:text-2xl">
          A code challenge by{' '}
          <a
            className="text-primary"
            href="https://www.linkedin.com/in/davin-mcdonald/"
            target="_blank"
            rel="noopener noreferrer">
            Davin McDonald
          </a>
        </p>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around md:mt-12">
          <a
            href="/challenge"
            className="max-w-96 rounded-md border p-4 text-left hover:text-primary focus:text-primary md:rounded-xl md:p-6">
            <h3 className="text-xl font-bold md:text-2xl">Go to Code Challenge &rarr;</h3>
            <p className="mt-4 text-base md:text-xl">
              A detailed look at <em>Depth Charts</em> using Next.js Framework and ShadCN/UI.
            </p>
          </a>
        </div>
      </div>
    </section>
  )
}
