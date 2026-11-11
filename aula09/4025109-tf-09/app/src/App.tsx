import { useState } from "react";
import UserList from "./components/UserList";
import UserTasks from "./components/UserTasks";
import type { User } from "./types";
import "./App.css";

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleChoose = (user: User) => setSelectedUser(user);

  return (
    <main className="app">
      <h1>Usuários e Tasks</h1>

      <div className="columns">
        <UserList selectedId={selectedUser?.id ?? null} onChoose={handleChoose} />

        {selectedUser !== null && <UserTasks key={selectedUser.id} user={selectedUser} />}
      </div>
    </main>
  );
}

export default App;
