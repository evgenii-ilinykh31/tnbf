"use client";

import React from "react";

const EditorToolbarImpl: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: 12,
        border: "1px solid #e5e7eb",
        borderRadius: 8,
      }}
    >
      <button>Добавить текст</button>
      <button>Добавить картинку</button>
      <button>Опубликовать</button>
    </div>
  );
};

export default EditorToolbarImpl;          // default-экспорт
export { EditorToolbarImpl as EditorToolbar }; // именованный экспорт