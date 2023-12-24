import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'

function LayoutProvider({ children }) {
  return (
    <>
      <Header />

      <main id="content">{children}</main>

      <Footer />
      <Sidebar />
    </>
  )
}

export default LayoutProvider
