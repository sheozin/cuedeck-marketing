'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Table, TableRow, TableCell, TableHeader } from '@tiptap/extension-table';




import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Youtube from '@tiptap/extension-youtube';

interface TiptapEditorProps {
  content: Record<string, unknown>;
  onChange: (content: Record<string, unknown>) => void;
  placeholder?: string;
}

const ToolbarBtn = ({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title?: string;
  children: React.ReactNode;
}) => (
  <button
    onMouseDown={(e) => { e.preventDefault(); onClick(); }}
    title={title}
    style={{
      padding: '5px 8px',
      background: active ? 'rgba(74,142,255,0.2)' : 'transparent',
      border: active ? '1px solid rgba(74,142,255,0.4)' : '1px solid transparent',
      borderRadius: '5px',
      color: active ? '#4A8EFF' : '#94a3b8',
      cursor: 'pointer',
      fontSize: '13px',
      lineHeight: 1,
      minWidth: '28px',
    }}
  >
    {children}
  </button>
);

export function TiptapEditor({ content, onChange, placeholder }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: placeholder ?? 'Start writing…' }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: true }),
      Youtube.configure({ inline: false }),
    ],
    content: Object.keys(content).length > 0 ? content : undefined,
    onUpdate({ editor }) {
      onChange(editor.getJSON() as Record<string, unknown>);
    },
  });

  if (!editor) return <div style={{ color: '#475569', padding: '16px' }}>Loading editor…</div>;

  function addLink() {
    const url = prompt('Enter URL:');
    if (!url) return;
    editor?.chain().focus().setLink({ href: url }).run();
  }

  function addImage() {
    const url = prompt('Image URL:');
    if (!url) return;
    editor?.chain().focus().setImage({ src: url }).run();
  }

  function addYoutube() {
    const url = prompt('YouTube URL:');
    if (!url) return;
    editor?.commands.setYoutubeVideo({ src: url });
  }

  function insertTable() {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }

  return (
    <div style={{
      background: '#0A0E1A',
      border: '1px solid #1e293b',
      borderRadius: '10px',
      overflow: 'hidden',
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2px',
        padding: '8px 12px',
        borderBottom: '1px solid #1e293b',
        background: '#111827',
      }}>
        {/* Headings */}
        {([1, 2, 3, 4] as const).map((level) => (
          <ToolbarBtn
            key={`h${level}`}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            active={editor.isActive('heading', { level })}
            title={`Heading ${level}`}
          >
            H{level}
          </ToolbarBtn>
        ))}

        <span style={{ width: '1px', background: '#1e293b', margin: '2px 4px', alignSelf: 'stretch' }} />

        {/* Text styles */}
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold"><strong>B</strong></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><em>I</em></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strike"><s>S</s></ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Inline code">{'`'}</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')} title="Highlight">◨</ToolbarBtn>

        <span style={{ width: '1px', background: '#1e293b', margin: '2px 4px', alignSelf: 'stretch' }} />

        {/* Alignment */}
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align left">⬅</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align center">≡</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align right">➡</ToolbarBtn>

        <span style={{ width: '1px', background: '#1e293b', margin: '2px 4px', alignSelf: 'stretch' }} />

        {/* Lists */}
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">•—</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered list">1.</ToolbarBtn>

        <span style={{ width: '1px', background: '#1e293b', margin: '2px 4px', alignSelf: 'stretch' }} />

        {/* Blocks */}
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">❝</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code block">{'</>'}</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal rule">─</ToolbarBtn>

        <span style={{ width: '1px', background: '#1e293b', margin: '2px 4px', alignSelf: 'stretch' }} />

        {/* Media */}
        <ToolbarBtn onClick={addLink} active={editor.isActive('link')} title="Add link">🔗</ToolbarBtn>
        <ToolbarBtn onClick={addImage} title="Add image">🖼</ToolbarBtn>
        <ToolbarBtn onClick={addYoutube} title="Embed YouTube">▶</ToolbarBtn>
        <ToolbarBtn onClick={insertTable} title="Insert table">⊞</ToolbarBtn>

        <span style={{ width: '1px', background: '#1e293b', margin: '2px 4px', alignSelf: 'stretch' }} />

        {/* History */}
        <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} title="Undo">↩</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} title="Redo">↪</ToolbarBtn>
      </div>

      {/* Editor */}
      <div style={{
        padding: '20px 24px',
        minHeight: '400px',
        color: '#f1f5f9',
        fontSize: '15px',
        lineHeight: 1.7,
      }}>
        <style>{`
          .ProseMirror { outline: none; min-height: 380px; }
          .ProseMirror h1 { font-size: 28px; font-weight: 700; color: #f1f5f9; margin: 24px 0 12px; }
          .ProseMirror h2 { font-size: 22px; font-weight: 700; color: #f1f5f9; margin: 20px 0 10px; }
          .ProseMirror h3 { font-size: 18px; font-weight: 600; color: #f1f5f9; margin: 16px 0 8px; }
          .ProseMirror h4 { font-size: 15px; font-weight: 600; color: #e2e8f0; margin: 12px 0 6px; }
          .ProseMirror p { margin: 0 0 12px; color: #cbd5e1; }
          .ProseMirror strong { color: #f1f5f9; }
          .ProseMirror em { color: #94a3b8; }
          .ProseMirror a { color: #4A8EFF; }
          .ProseMirror blockquote { border-left: 3px solid #4A8EFF; margin: 16px 0; padding: 8px 16px; color: #94a3b8; font-style: italic; }
          .ProseMirror code { background: #1e293b; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 13px; color: #0ECECE; }
          .ProseMirror pre { background: #111827; border: 1px solid #1e293b; border-radius: 8px; padding: 16px; overflow-x: auto; margin: 16px 0; }
          .ProseMirror pre code { background: none; padding: 0; color: #0ECECE; }
          .ProseMirror ul, .ProseMirror ol { padding-left: 24px; margin: 8px 0; }
          .ProseMirror li { margin: 4px 0; color: #cbd5e1; }
          .ProseMirror img { max-width: 100%; border-radius: 8px; margin: 8px 0; }
          .ProseMirror table { border-collapse: collapse; width: 100%; margin: 16px 0; }
          .ProseMirror th, .ProseMirror td { border: 1px solid #1e293b; padding: 8px 12px; }
          .ProseMirror th { background: #1e293b; font-weight: 600; }
          .ProseMirror hr { border: none; border-top: 1px solid #1e293b; margin: 24px 0; }
          .ProseMirror .is-empty::before { content: attr(data-placeholder); color: #475569; pointer-events: none; float: left; height: 0; }
          mark { background: rgba(245,158,11,0.3); color: #fbbf24; padding: 0 2px; border-radius: 2px; }
        `}</style>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
