import Header from './header';
import Footer from './footer';

export default function Home({children, home}) {
  return (
    <main>
      <Header home={home} />

      <div className="relative">
        {children}
      </div>

      <Footer />
    </main>
  )
}
