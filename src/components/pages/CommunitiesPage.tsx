import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { PetTypeCommunities } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<PetTypeCommunities[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCommunities();
  }, []);

  const loadCommunities = async () => {
    try {
      const { items } = await BaseCrudService.getAll<PetTypeCommunities>('pettypecommunities');
      const activeCommunities = items.filter((c) => c.isActive);
      setCommunities(activeCommunities);
    } catch (error) {
      console.error('Error loading communities:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-foreground/20 border-t-foreground rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-16 lg:py-24">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-5xl lg:text-7xl text-foreground mb-6"
            >
              Pet Communities
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-paragraph text-lg lg:text-xl text-foreground/80 max-w-3xl mx-auto"
            >
              Join dedicated communities for your pet type. Share experiences, ask questions, and connect with fellow enthusiasts.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communities.map((community, index) => (
              <motion.div
                key={community._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/community/${community._id}`}>
                  <Card className="bg-secondary border-none rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 h-full">
                    {community.communityImage && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <Image
                          src={community.communityImage}
                          alt={community.petTypeName || 'Community'}
                          width={600}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-6 lg:p-8">
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="font-heading text-2xl lg:text-3xl text-secondary-foreground">
                          {community.petTypeName}
                        </h2>
                        <Badge className="bg-secondary-foreground text-secondary">
                          <Users className="w-3 h-3 mr-1" />
                          {community.memberCount || 0}
                        </Badge>
                      </div>
                      <p className="font-paragraph text-base text-secondary-foreground/80 mb-6">
                        {community.description}
                      </p>
                      <div className="flex items-center text-secondary-foreground font-paragraph text-sm">
                        Join Community
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {communities.length === 0 && (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-foreground/70">
                No active communities found. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
