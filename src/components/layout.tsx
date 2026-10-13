import Footer from './footer'
import Header from './header'
import Links from './links'

interface ILayoutProps {
  children: React.ReactNode
  showLinks?: boolean
}

export default function Home({ children, showLinks = true }: ILayoutProps) {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {showLinks && <Links />}

      <div className="relative flex flex-col flex-1 overflow-x-clip">
        {children}
      </div>

      <Footer />
    </main>
  )
}
