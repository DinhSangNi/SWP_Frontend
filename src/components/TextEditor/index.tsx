import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
// Import ReactQuill css
import "react-quill/dist/quill.snow.css";

type Props = {
    content?: string;
    readOnly?: boolean;
    className?: string;
    onContentChange?: (content: any) => void;
};

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }], // Headings (H1, H2, normal text)
        ["bold", "italic", "underline", "strike"], // Text styles
        [{ list: "ordered" }, { list: "bullet" }], // Lists
        [{ script: "sub" }, { script: "super" }], // Subscript / Superscript
        [{ indent: "-1" }, { indent: "+1" }], // Indentation
        [{ align: [] }], // Align text
        ["blockquote", "code-block"], // Block styles
        ["link", "image", "video"], // Media embeds
        ["clean"], // Remove formatting
    ],
};

const TextEditor = ({
    content,
    onContentChange,
    className,
    readOnly,
}: Props) => {
    const [editorValue, setEditorValue] = useState<string>(content || "");

    const handleChange = (value: string) => {
        setEditorValue(value);
        if (onContentChange) {
            onContentChange(value);
        }
    };

    useEffect(() => {
        if (content) {
            setEditorValue(content);
        } else {
            setEditorValue("");
        }
    }, [content]);

    return (
        <>
            <ReactQuill
                className={className}
                readOnly={readOnly}
                placeholder="Do something here."
                theme="snow"
                value={editorValue}
                onChange={handleChange}
                modules={modules}
            />
        </>
    );
};

export default TextEditor;
