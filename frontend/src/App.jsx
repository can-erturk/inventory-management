import LayoutProvider from '@/lib/providers/LayoutProvider'
import RouterProvider from '@/lib/providers/RouterProvider'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import checkJwt from '@/lib/helpers/checkJwt'

function App() {
  const { jwt } = useSelector((state) => state.auth)

  // Check if the JWT is valid
  useEffect(() => {
    ;(async () => await checkJwt(jwt))()
  }, [jwt])

  // If there is no JWT, don't render the layout
  if (!jwt) {
    return <RouterProvider />
  }

  return (
    <LayoutProvider>
      <RouterProvider />
    </LayoutProvider>
  )
}

export default App
