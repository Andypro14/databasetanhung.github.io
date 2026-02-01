import React from 'react';

interface HighlightTextProps {
  text: string;
  highlight?: string;
}

export function HighlightText({ text, highlight }: HighlightTextProps) {
  if (!highlight || !text) return <span>{text || ''}</span>;

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="bg-yellow-200 text-gray-900 font-semibold px-0.5 rounded-sm shadow-sm">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}
