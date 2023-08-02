import React from "react";
import { CKEditor } from "ckeditor4-react";

const MyEditor = ({ setEditorData }) => {
  const handleChange = (event) => {
    console.log("event.editor.getData()", event.editor.getData());
    const data = event.editor.getData();
    setEditorData(data);
  };

  return (
    <div>
      <p className="font-semibold my-2">Email Body</p>
      <CKEditor data="" onChange={handleChange} />
    </div>
  );
};

export default MyEditor;
