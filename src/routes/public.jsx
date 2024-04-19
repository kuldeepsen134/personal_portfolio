import About from "../pages/About"
import Home from "../pages/Home"
import Login from "../pages/Login"

const PublicRoutes = [
  { path: '/login', exact: true, name: 'Login', component: Login },
  { path: '/home', exact: true, name: 'home', component: Home },
  { path: '/aboutUS', name: 'About', exact: true, component: About },
]

export default PublicRoutes