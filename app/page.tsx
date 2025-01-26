import Image from 'next/image'

export default function Home() {
  return (
    <section className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <div className="mt-10" />
      <h1 className="text-6xl font-bold">
        Welcome to <span className="text-primary">Players</span>
      </h1>
      <p className="mt-3 text-2xl">
        A code challenge by{' '}
        <a
          className="text-primary"
          href="https://www.linkedin.com/in/davin-mcdonald/"
          target="_blank"
          rel="noopener noreferrer">
          Davin McDonald
        </a>
      </p>
      <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
        <a
          href="/challenge"
          className="hover:text-primary focus:text-primary mt-6 w-96 rounded-xl border p-6 text-left">
          <h3 className="text-2xl font-bold">Go to Code Challenge &rarr;</h3>
          <p className="mt-4 text-xl">
            A detailed look at <em>Depth Charts</em> using Next.js Framework and ShadCN/UI.
          </p>
        </a>
      </div>
    </section>
  )
}
