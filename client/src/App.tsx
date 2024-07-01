import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./components/Layout/Layout"
import { GlobalStyle } from "./style/global"
import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./style/theme"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { ReactQueryDevtools } from "react-query/devtools"
import { QueryClient, QueryClientProvider } from "react-query"
import ProductDetail from "./pages/ProductDetail"

function App() {
  const routerList = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/products/:category_id/:id",
      element: <ProductDetail />,
    },
    {
      path: "/products/:id",
      element: <ProductDetail />,
    },
  ]

  const newRouterList = routerList.map((route) => {
    return {
      ...route,
      element: <Layout>{route.element}</Layout>,
    }
  })

  const router = createBrowserRouter(newRouterList)

  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <ThemeProvider theme={defaultTheme}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
