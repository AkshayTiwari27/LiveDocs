'use client';

import Theme from './plugins/Theme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import React from 'react';

import {
  FloatingComposer,
  FloatingThreads,
  liveblocksConfig,
  LiveblocksPlugin,
  useEditorStatus,
} from '@liveblocks/react-lexical';
import Loader from '../Loader';

import FloatingToolbarPlugin from './plugins/FloatingToolbarPlugin';
import { useThreads } from '@liveblocks/react/suspense';
import Comments from '../Comments';
import { DeleteModal } from '../DeleteModal';
import AIModal from '../AIModal';
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

function EditorInner({
  roomId,
  currentUserType,
}: {
  roomId: string;
  currentUserType: UserType;
}) {
  const [editor] = useLexicalComposerContext();
  const status = useEditorStatus();
  const { threads } = useThreads();

  const handleAIResponse = (text: string) => {
    editor.update(() => {
      const root = $getRoot();
      const paragraphNode = $createParagraphNode();
      const textNode = $createTextNode(text);
      paragraphNode.append(textNode);
      root.append(paragraphNode);
    });
  };

  return (
    <div className="editor-container size-full">
      <div className="toolbar-wrapper flex min-w-full justify-between">
        <ToolbarPlugin />
        <div className="flex items-center gap-2 pr-4">
          <AIModal onGenerate={handleAIResponse} />
          {currentUserType === 'editor' && <DeleteModal roomId={roomId} />}
        </div>
      </div>

      <div className="editor-wrapper flex flex-col items-center justify-start">
        {status === 'not-loaded' || status === 'loading' ? (
          <Loader />
        ) : (
          <div className="editor-inner relative mb-5 min-h-[1100px] h-fit w-full max-w-[800px] shadow-md lg:mb-10">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input h-full" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            {currentUserType === 'editor' && <FloatingToolbarPlugin />}
            <HistoryPlugin />
            <AutoFocusPlugin />
          </div>
        )}

        <LiveblocksPlugin>
          <FloatingComposer className="w-[350px]" />
          <FloatingThreads threads={threads} />
          <Comments />
        </LiveblocksPlugin>
      </div>
    </div>
  );
}

export function Editor({
  roomId,
  currentUserType,
}: {
  roomId: string;
  currentUserType: UserType;
}) {
  const initialConfig = liveblocksConfig({
    namespace: 'Editor',
    nodes: [HeadingNode],
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
    theme: Theme,
    editable: currentUserType === 'editor',
  });

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorInner roomId={roomId} currentUserType={currentUserType} />
    </LexicalComposer>
  );
}