import { Provider } from 'react-redux'
import store from '@/lib/stores'

function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
