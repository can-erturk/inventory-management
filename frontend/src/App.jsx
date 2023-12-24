import ReduxProvider from '@/lib/providers/ReduxProvider'
import LayoutProvider from '@/lib/providers/LayoutProvider'
import RouterProvider from '@/lib/providers/RouterProvider'

function App() {
  return (
    <ReduxProvider>
      <LayoutProvider>
        <RouterProvider />
      </LayoutProvider>
    </ReduxProvider>
  )
}

export default App
