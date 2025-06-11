// components/RichTextEditor.tsx

"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface RichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content = "", onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChange) {
        onChange(html);
      }
    },
  });

  if (!editor) {
    return  <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>;
  }

  return (
    <Card className="w-full h-full">
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Button size="sm" variant="outline" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-muted' : ''}>
            Bold
          </Button>
          <Button size="sm" variant="outline" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-muted' : ''}>
            Italic
          </Button>
          <Button size="sm" variant="outline" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'bg-muted' : ''}>
            Underline
          </Button>
          <Button size="sm" variant="outline" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'bg-muted' : ''}>
            Strike
          </Button>
          <Button size="sm" variant="outline" onClick={() => editor.chain().focus().setTextAlign('left').run()}>
            Left
          </Button>
          <Button size="sm" variant="outline" onClick={() => editor.chain().focus().setTextAlign('center').run()}>
            Center
          </Button>
          <Button size="sm" variant="outline" onClick={() => editor.chain().focus().setTextAlign('right').run()}>
            Right
          </Button>
          <Button size="sm" variant="outline" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}>
            H1
          </Button>
          <Button size="sm" variant="outline" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}>
            H2
          </Button>
        </div>

       <div className="bg-white min-h-[300px] max-h-[500px] overflow-y-auto">
          <EditorContent editor={editor} className="prose max-w-none focus:outline-none" />
        </div>
      </CardContent>
    </Card>
  );
};

export default RichTextEditor;
