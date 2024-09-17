import { useSelector } from "react-redux"
import useRoutesCustome from "./hooks/useRoutesCustome"


function App() {
  const routes = useRoutesCustome()
  return routes
}

export default App
