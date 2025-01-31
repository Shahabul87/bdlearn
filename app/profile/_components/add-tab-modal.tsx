"use client";

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AddTabModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export const AddTabModal = ({ isOpen, onClose, userId }: AddTabModalProps) => {
  const [label, setLabel] = useState('');
  const [icon, setIcon] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/custom-tabs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label,
          icon,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create tab');
      }

      toast.success('Tab created successfully');
      setLabel('');
      setIcon('');
      onClose();
    } catch (error) {
      toast.error('Failed to create tab');
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6 dark:bg-gray-800">
          <Dialog.Title className="text-lg font-medium mb-4">
            Add New Tab
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Label
              </label>
              <Input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Icon Name
              </label>
              <Input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Add Tab
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}; 