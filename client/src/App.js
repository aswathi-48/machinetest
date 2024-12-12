import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';



const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <SignIn />
  },
  {
    path: '/home',
    element: <Home />
  },
 
])


function App() {
  return (
    <div className="App">
           <RouterProvider router={router}></RouterProvider>

    </div>
  );
}

export default App;
