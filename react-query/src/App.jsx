import { useEffect, useState } from "react"
import { Link } from "react-router-dom"



function App() {

  return (
    <>
      <h1>TanSTack Query</h1>
      <div>
        <Link to='/' >Home</Link>
        <br />
        <Link to='/products' >Products</Link>
      </div>
    </>
  )
}

export default App
