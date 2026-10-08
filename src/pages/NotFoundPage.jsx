export default function NotFoundPage({ navigate }) {
  const goHome = (e) => {
    e.preventDefault()
    navigate('/boards')
  }

  return (
    <div className="page" style={{ textAlign: 'center' }}>
      <h1>404</h1>
      <p>Страница не найдена</p>
      <a href="/boards" onClick={goHome}>← На главную</a>
    </div>
  )
}