
import React from 'react';
import { Share, Facebook, Twitter, Instagram, Linkedin, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
  variant?: 'button' | 'compact' | 'inline';
}

const SocialShare: React.FC<SocialShareProps> = ({
  url,
  title,
  description = '',
  className = '',
  variant = 'button'
}) => {
  const [copied, setCopied] = React.useState(false);

  const shareData = {
    url: encodeURIComponent(url),
    title: encodeURIComponent(title),
    description: encodeURIComponent(description)
  };

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareData.url}`,
      color: 'hover:bg-blue-600 hover:text-white'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${shareData.url}&text=${shareData.title}`,
      color: 'hover:bg-sky-500 hover:text-white'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareData.url}`,
      color: 'hover:bg-blue-700 hover:text-white'
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copiado para a área de transferência!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Erro ao copiar link');
    }
  };

  const handleShare = (platform: typeof socialPlatforms[0]) => {
    window.open(platform.url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center space-x-2', className)}>
        {socialPlatforms.map((platform) => (
          <Button
            key={platform.name}
            variant="ghost"
            size="sm"
            onClick={() => handleShare(platform)}
            className={cn('h-8 w-8 p-0 rounded-full', platform.color)}
            title={`Partilhar no ${platform.name}`}
          >
            <platform.icon className="h-4 w-4" />
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyLink}
          className="h-8 w-8 p-0 rounded-full hover:bg-gray-200"
          title="Copiar link"
        >
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant === 'compact' ? 'ghost' : 'outline'}
          size={variant === 'compact' ? 'sm' : 'default'}
          className={cn('gap-2', className)}
        >
          <Share className="h-4 w-4" />
          {variant !== 'compact' && 'Partilhar'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {socialPlatforms.map((platform) => (
          <DropdownMenuItem
            key={platform.name}
            onClick={() => handleShare(platform)}
            className="gap-2 cursor-pointer"
          >
            <platform.icon className="h-4 w-4" />
            {platform.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={handleCopyLink} className="gap-2 cursor-pointer">
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copiado!' : 'Copiar link'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SocialShare;
