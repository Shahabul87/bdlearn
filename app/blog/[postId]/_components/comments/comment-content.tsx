interface CommentContentProps {
  content: string;
}

export const CommentContent = ({ content }: CommentContentProps) => {
  return (
    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed tracking-wide font-light ml-14 mb-4">
      {content}
    </p>
  );
}; 