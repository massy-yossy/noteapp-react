import { memo } from "react";
import "./sidebar.scss";

const Sidebar = memo((props) => {
  const { onClickAdd, todos, onClickDelete, noteActive, setNoteActive } = props;

  const sortTodos = todos.sort((a,b) => b.date - a.date)


  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>ノート</h1>
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="app-sidebar-notes">
        {sortTodos.map((todo) => (
          <div
            key={todo.id}
            className={`app-sidebar-note ${todo.id === noteActive && "active"}`} //格納したIDとレンダリングした際のidが一致するところにクラスを付与する
            onClick={() => setNoteActive(todo.id)} //クリックした場所のidを格納する
          >
            <div className="sidebar-note-title">
              <strong>{todo.title}</strong>
              <button onClick={() => onClickDelete(todo.id, todos)}>
                削除
              </button>
            </div>
            <p>{todo.content}</p>
            <small>
              最後の修正日：
              {new Date(todo.date).toLocaleDateString("ja-JP", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Sidebar;
