
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Instagram, Twitter, ExternalLink, Calendar, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface SocialPost {
  id: string;
  platform: 'instagram' | 'twitter';
  content: string;
  image?: string;
  date: string;
  url: string;
  likes?: number;
  comments?: number;
  author: string;
}

interface SocialFeedProps {
  posts?: SocialPost[];
  maxPosts?: number;
  showHeader?: boolean;
}

const SocialFeed: React.FC<SocialFeedProps> = ({
  posts = [],
  maxPosts = 6,
  showHeader = true
}) => {
  // Dados de exemplo para demonstração
  const fallbackPosts: SocialPost[] = [
    {
      id: '1',
      platform: 'instagram',
      content: '🏀 Grande vitória do ABC na Liga Nacional! Parabéns aos atletas pelo excelente desempenho. #FCBB #BasquetebolCV',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&h=400&q=80',
      date: '2025-01-23T15:30:00Z',
      url: 'https://instagram.com/p/example1',
      likes: 234,
      comments: 18,
      author: 'fcbb.cv'
    },
    {
      id: '2',
      platform: 'twitter',
      content: 'Convocatória da Seleção Nacional para o próximo AfroBasket já disponível! 🇨🇻 #SelecaoCV #AfroBasket',
      date: '2025-01-22T10:15:00Z',
      url: 'https://twitter.com/fcbb_oficial/status/example',
      likes: 89,
      comments: 12,
      author: 'fcbb_oficial'
    },
    {
      id: '3',
      platform: 'instagram',
      content: 'Workshop de formação para treinadores em curso! 📚 Investindo no futuro do basquetebol cabo-verdiano.',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=400&h=400&q=80',
      date: '2025-01-21T14:20:00Z',
      url: 'https://instagram.com/p/example3',
      likes: 156,
      comments: 8,
      author: 'fcbb.cv'
    }
  ];

  const postsToShow = posts.length > 0 ? posts.slice(0, maxPosts) : fallbackPosts.slice(0, maxPosts);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return Instagram;
      case 'twitter':
        return Twitter;
      default:
        return Instagram;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'bg-gradient-to-br from-purple-600 to-pink-600';
      case 'twitter':
        return 'bg-sky-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {showHeader && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-cv-blue mb-4 font-display">
            Redes Sociais
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Acompanhe as últimas novidades nas nossas redes sociais
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postsToShow.map((post, index) => {
          const PlatformIcon = getPlatformIcon(post.platform);
          
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-full ${getPlatformColor(post.platform)} text-white`}>
                        <PlatformIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">@{post.author}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(new Date(post.date), 'dd MMM', { locale: ptBR })}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {post.platform}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {post.image && (
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={post.image}
                        alt="Post image"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}

                  <p className="text-sm leading-relaxed">{post.content}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      {post.likes && (
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{post.likes}</span>
                        </div>
                      )}
                      {post.comments && (
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>{post.comments}</span>
                        </div>
                      )}
                    </div>
                    
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-xs text-cv-blue hover:text-blue-700 transition-colors"
                    >
                      <span>Ver post</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center">
        <motion.a
          href="https://instagram.com/fcbb.cv"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Instagram className="h-5 w-5" />
          <span>Seguir no Instagram</span>
        </motion.a>
      </div>
    </div>
  );
};

export default SocialFeed;
