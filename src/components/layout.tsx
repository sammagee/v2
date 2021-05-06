import Header from './header';
import Footer from './footer';
import Links from './links';

export default function Home({ children, home = false }) {
  return (
    <main className="flex flex-col min-h-screen">
      <Header home={home} />

      <Links />

      <div className="relative flex flex-col flex-1">
        {children}
      </div>

      <Footer />
    </main>
  )
}
