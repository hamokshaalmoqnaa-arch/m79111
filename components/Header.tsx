
import React from 'react';

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C11.45 2 11 2.45 11 3V4.5C11 5.05 11.45 5.5 12 5.5C12.55 5.5 13 5.05 13 4.5V3C13 2.45 12.55 2 12 2ZM6.22 6.22C5.83 5.83 5.2 5.83 4.81 6.22C4.42 6.61 4.42 7.24 4.81 7.63L5.93 8.75C6.32 9.14 6.95 9.14 7.34 8.75C7.73 8.36 7.73 7.73 7.34 7.34L6.22 6.22ZM19.19 4.81C18.8 4.42 18.17 4.42 17.78 4.81L16.66 5.93C16.27 6.32 16.27 6.95 16.66 7.34C17.05 7.73 17.68 7.73 18.07 7.34L19.19 6.22C19.58 5.83 19.58 5.2 19.19 4.81ZM21 11H19.5C18.95 11 18.5 11.45 18.5 12C18.5 12.55 18.95 13 19.5 13H21C21.55 13 22 12.55 22 12C22 11.45 21.55 11 21 11ZM4.5 11H3C2.45 11 2 11.45 2 12C2 12.55 2.45 13 3 13H4.5C5.05 13 5.5 12.55 5.5 12C5.5 11.45 5.05 11 4.5 11ZM17.78 16.66C18.17 16.27 18.8 16.27 19.19 16.66C19.58 17.05 19.58 17.68 19.19 18.07L18.07 19.19C17.68 19.58 17.05 19.58 16.66 19.19C16.27 18.8 16.27 18.17 16.66 17.78L17.78 16.66ZM7.34 16.66C6.95 16.27 6.32 16.27 5.93 16.66L4.81 17.78C4.42 18.17 4.42 18.8 4.81 19.19C5.2 19.58 5.83 19.58 6.22 19.19L7.34 18.07C7.73 17.68 7.73 17.05 7.34 16.66ZM13 18.5V21C13 21.55 12.55 22 12 22C11.45 22 11 21.55 11 21V18.5C11 17.95 11.45 17.5 12 17.5C12.55 17.5 13 17.95 13 18.5ZM12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8Z" />
    </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center">
        <div className="flex items-center gap-3">
            <SparkleIcon className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold tracking-wider bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                محرر الصور بالذكاء الاصطناعي
            </h1>
        </div>
      </div>
    </header>
  );
};
