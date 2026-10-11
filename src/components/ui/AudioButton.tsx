import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface AudioButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  rate?: number;
  accent?: 'US' | 'UK';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  size = 'md',
  rate = 1.0,
  accent = 'US',
  showLabel = false,
  label = 'Ouvir pronúncia',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      audioService.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    const success = audioService.speak(text, {
      rate,
      accent,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });

    if (!success) {
      setIsPlaying(false);
    }
  };

  const iconSizes = {
    sm: 15,
    md: 18,
    lg: 20,
  };

  if (showLabel) {
    return (
      <button
        type="button"
        onClick={handlePlay}
        aria-label={label}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F3EF] hover:bg-[#EAE8E4] text-[#1B1C1A] text-xs font-semibold transition-all ${
          isPlaying ? 'ring-2 ring-[#006D30] text-[#006D30]' : ''
        } ${className}`}
      >
        <Volume2 size={iconSizes[size]} className={isPlaying ? 'animate-pulse text-[#006D30]' : 'text-[#45464D]'} />
        <span>{isPlaying ? 'Reproduzindo...' : label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      aria-label={label}
      title={label}
      className={`p-1.5 rounded-full hover:bg-[#EAE8E4] text-[#45464D] hover:text-[#1B1C1A] transition-colors ${
        isPlaying ? 'bg-[#92F5A4]/40 text-[#006D30]' : ''
      } ${className}`}
    >
      <Volume2 size={iconSizes[size]} className={isPlaying ? 'animate-pulse text-[#006D30]' : ''} />
    </button>
  );
};
