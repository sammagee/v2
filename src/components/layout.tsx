import Footer from './footer'
import Header from './header'
import Links from './links'

export default function Home({ children }) {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <Links />

      <div className="relative flex flex-col flex-1 overflow-x-hidden">
        {children}
      </div>

      <Footer />
    </main>
  )
}
