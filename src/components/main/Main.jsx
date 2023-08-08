import { memo } from "react";
import "./main.scss";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Main = memo((props) => {
  //noteActiveの中身はfindで取得したオブジェクトが入っている
  const { noteActive, updateTodos } = props;
  if (!noteActive) {
    return <div className="no-active">ノートを選択してね！</div>;
  }

  // テキストを反映させる関数
  const onChangeText = (key, value) => {
    updateTodos({
      ...noteActive,
      [key]: value,
      date: Date.now(),
    })
  }


  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          value={noteActive.title}
          onChange={(e) => onChangeText("title", e.target.value)}
          />
        <textarea
          name=""
          id="content"
          placeholder="ノート内容を記入"
          value={noteActive.content}
          onChange={(e) => onChangeText("content", e.target.value)}
          ></textarea>
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{noteActive.title}</h1>
        <ReactMarkdown className="markdown-preview">{noteActive.content}</ReactMarkdown>
      </div>
    </div>
  );
});

export default Main;
