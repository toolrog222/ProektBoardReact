import { BoardProvider } from './context/BoardContext'
import { useRoute } from './hooks/useRoute'
import BoardsListPage from './pages/BoardsListPage'
import BoardPage from './pages/BoardPage'
import NotFoundPage from './pages/NotFoundPage'

function Router() {
  const { route, navigate } = useRoute()

  if (route.name === 'boards') {
    return <BoardsListPage navigate={navigate} />
  }
  if (route.name === 'board') {
    return <BoardPage boardId={route.id} navigate={navigate} />
  }
  return <NotFoundPage navigate={navigate} />
}

function App() {
  return (
    <BoardProvider>
      <Router />
    </BoardProvider>
  )
}

export default App