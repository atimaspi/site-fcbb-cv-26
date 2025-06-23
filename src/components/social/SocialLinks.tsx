
import React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SocialLink {
  platform: string;
  url: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  hoverColor: string;
}

interface SocialLinksProps {
  variant?: 'default' | 'compact' | 'floating' | 'footer';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  variant = 'default',
  size = 'md',
  className = '',
  animated = true
}) => {
  const socialLinks: SocialLink[] = [
    {
      platform: 'facebook',
      url: 'https://facebook.com/fcbb.cv',
      label: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      hoverColor: 'hover:bg-blue-600 hover:text-white'
    },
    {
      platform: 'instagram',
      url: 'https://instagram.com/fcbb.cv',
      label: 'Instagram',
      icon: Instagram,
      color: 'text-pink-600',
      hoverColor: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:text-white'
    },
    {
      platform: 'twitter',
      url: 'https://twitter.com/fcbb_oficial',
      label: 'Twitter',
      icon: Twitter,
      color: 'text-sky-500',
      hoverColor: 'hover:bg-sky-500 hover:text-white'
    },
    {
      platform: 'youtube',
      url: 'https://youtube.com/@fcbb.cv',
      label: 'YouTube',
      icon: Youtube,
      color: 'text-red-600',
      hoverColor: 'hover:bg-red-600 hover:text-white'
    }
  ];

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-8 w-8';
      case 'lg':
        return 'h-12 w-12';
      default:
        return 'h-10 w-10';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4';
      case 'lg':
        return 'h-6 w-6';
      default:
        return 'h-5 w-5';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return 'space-x-1';
      case 'floating':
        return 'space-x-2 p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20';
      case 'footer':
        return 'space-x-3';
      default:
        return 'space-x-2';
    }
  };

  const renderLink = (social: SocialLink, index: number) => {
    const LinkComponent = animated ? motion.a : 'a';
    const linkProps = animated ? {
      initial: { opacity: 0, scale: 0 },
      whileInView: { opacity: 1, scale: 1 },
      transition: { duration: 0.3, delay: index * 0.1 },
      viewport: { once: true },
      whileHover: { scale: 1.1, y: -2 },
      whileTap: { scale: 0.95 }
    } : {};

    return (
      <LinkComponent
        key={social.platform}
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'inline-flex items-center justify-center rounded-lg transition-all duration-300 border border-gray-200',
          getSizeClasses(),
          social.hoverColor,
          variant === 'footer' ? 'bg-white/10 border-white/20' : 'bg-white hover:shadow-md'
        )}
        title={`Seguir no ${social.label}`}
        aria-label={`Seguir FCBB no ${social.label}`}
        {...linkProps}
      >
        <social.icon className={cn(getIconSize(), social.color, 'transition-colors')} />
      </LinkComponent>
    );
  };

  return (
    <div className={cn('flex items-center', getVariantClasses(), className)}>
      {socialLinks.map((social, index) => renderLink(social, index))}
    </div>
  );
};

export default SocialLinks;
