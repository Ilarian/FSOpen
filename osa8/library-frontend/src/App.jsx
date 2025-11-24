import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useApolloClient, useQuery } from "@apollo/client/react";
import Recommended from "./components/Recommended";
import { ME } from "../queries";


const App = () => {
  const [page, setPage] = useState("authors");
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const result = useQuery(ME)

  useEffect(() => {
    if(token){
      result.refetch().then(res => setUser(res.data.me))
    }
  },[token])

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ?
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommended")} >recommended</button>
            <button onClick={logout}>logout</button>
          </>
          :
          <>
            <button onClick={() => setPage("login")}>login</button>
          </>
        }
      </div>

      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommended show={page === "recommended"} user={user} />
      <Login show={page === "login"} setToken={setToken} setPage={setPage} />
        
    </div>
  );
};

export default App;
