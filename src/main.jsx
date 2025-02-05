import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthContext/AuthContext.jsx'
import { TicketContextProvier } from './Context/TicketContext/Ticket.jsx'
import { Provider } from 'react-redux'
import { store } from './Store/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
      <TicketContextProvier>
        <App />
      </TicketContextProvier>
    </AuthProvider>

  </Provider>,
)
