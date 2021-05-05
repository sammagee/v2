import Header from './header';
import Footer from './footer';

export default function Home({ children, home = false }) {
  return (
    <main className="flex flex-col min-h-screen">
      <Header home={home} />

      <div className="relative flex-1">
        {children}
      </div>

      <Footer />
    </main>
  )
}
