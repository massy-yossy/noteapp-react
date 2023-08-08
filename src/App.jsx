import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";

import Main from "./components/main/Main";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  //追加したノートを格納
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todoDate")) || []); //JSON形式をJavascriptの形に変換する
  //選択したノートを入れる
  const [noteActive, setNoteActive] = useState(false);

  useEffect(() => {
    localStorage.setItem("todoDate",JSON.stringify(todos)) //JSON形式にする
  }, [todos]);

  useEffect(() => {
    setNoteActive(todos[0].id)
  }, []);


  //追加する関数
  const onClickAdd = () => {
    const newTodos = {
      id: uuid(),
      title: "",
      content: "",
      date: Date.now(),
    };
    setTodos([...todos, newTodos]);
  };
  //削除する関数
  const onClickDelete = (id, todos) => {
    console.log(id);
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  //選択したノートのオブジェクトを取得して中身をプロップスで渡す
  const getActiveNote = () => {
    return todos.find((todo) => todo.id === noteActive);
  };

  //todosを更新する関数
  const updateTodos = (updateData) => {
    const updateTodosArray = todos.map((todo) => {
      if (todo.id === updateData.id) {
        return updateData;
      } else {
        return todo;
      }
    });
    setTodos(updateTodosArray);
  };

  return (
    <>
      <div className="App">
        <Sidebar
          onClickAdd={onClickAdd}
          todos={todos}
          onClickDelete={onClickDelete}
          noteActive={noteActive}
          setNoteActive={setNoteActive}
        />
        {/* 関数自体を渡すのではなく、実行した関数の中身が欲しいから（）を付ける */}
        <Main noteActive={getActiveNote()} updateTodos={updateTodos} />
      </div>
    </>
  );
}

export default App;
