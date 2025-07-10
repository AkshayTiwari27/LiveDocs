'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useSelf } from '@liveblocks/react/suspense';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import UserTypeSelector from './UserTypeSelector';
import Collaborator from './Collaborator';
import { updateDocumentAccess } from '@/lib/actions/room.actions';
import { Sparkles } from 'lucide-react';

const AIModal = ({ onGenerate }: { onGenerate: (prompt: string) => void }) => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const { response: text } = await response.json();
      onGenerate(text);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-blue flex h-9 items-center gap-2 px-4">
          <Sparkles className="h-4 w-4" />
          <p className="mr-1 hidden sm:block">Ask AI</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <DialogTitle>Ask AI to generate content</DialogTitle>
          <DialogDescription>
            Let AI help you write. Enter a prompt and get a response.
          </DialogDescription>
        </DialogHeader>

        <Label htmlFor="prompt" className="mt-6 text-blue-100">
          Your Prompt
        </Label>
        <div className="flex flex-col gap-3">
          <Input
            id="prompt"
            placeholder="e.g., Write a poem about collaboration"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="share-input"
          />
          <Button
            type="submit"
            onClick={handleGenerate}
            className="gradient-blue flex h-full gap-1 px-5"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIModal;