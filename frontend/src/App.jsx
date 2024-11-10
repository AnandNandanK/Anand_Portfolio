import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './component/Home'




const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },

  {
    path: '/login',
    element: <Login />
  },
])


function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
