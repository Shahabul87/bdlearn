interface AddTabModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export const AddTabModal = ({ isOpen, onClose, userId }: AddTabModalProps) => {
  const handleAddTab = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/custom-tabs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: "New Tab",
          icon: "tab",
          userId,
        }),
      });

      if (response.ok) {
        onClose();
      }
    } catch (error) {
      console.error('Error adding tab:', error);
    }
  };

  // existing modal JSX...
}; 