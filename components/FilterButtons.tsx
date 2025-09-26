
import React from 'react';

interface Filter {
  name: string;
  prompt: string;
}

const filters: Filter[] = [
  { name: 'عتيق', prompt: 'Apply a vintage, sepia-toned, slightly grainy film filter to the image.' },
  { name: 'أبيض وأسود', prompt: 'Convert the image to a high-contrast, dramatic black and white photograph.' },
  { name: 'كرتوني', prompt: 'Transform the image into a colorful cartoon or comic book style drawing.' },
  { name: 'نيون', prompt: 'Give the image a neon punk aesthetic, with vibrant, glowing pink and cyan highlights and deep shadows.' },
  { name: 'ألوان مائية', prompt: 'Turn the image into a beautiful watercolor painting with soft edges and blended colors.' },
  { name: 'فن البوب', prompt: 'Recreate the image in the style of Andy Warhol\'s pop art, with bold, blocky colors.' },
];

interface FilterButtonsProps {
  onSelectFilter: (prompt: string) => void;
  disabled: boolean;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({ onSelectFilter, disabled }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {filters.map((filter) => (
        <button
          key={filter.name}
          onClick={() => onSelectFilter(filter.prompt)}
          disabled={disabled}
          className="bg-gray-700/50 hover:bg-gray-600/50 disabled:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-2 px-2 rounded-md transition-colors duration-200 border border-gray-600/80 focus:ring-2 focus:ring-purple-500"
          aria-label={`Apply ${filter.name} filter`}
        >
          {filter.name}
        </button>
      ))}
    </div>
  );
};
