import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { PetGalleryPhotos } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, User, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GalleryPage() {
  const [photos, setPhotos] = useState<PetGalleryPhotos[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<PetGalleryPhotos[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [petTypeFilter, setPetTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, []);

  useEffect(() => {
    let filtered = photos;

    if (petTypeFilter !== 'all') {
      filtered = filtered.filter((photo) => photo.petType === petTypeFilter);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (photo) =>
          photo.photoTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          photo.caption?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          photo.uploaderName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPhotos(filtered);
  }, [searchQuery, petTypeFilter, photos]);

  const loadPhotos = async () => {
    try {
      const { items } = await BaseCrudService.getAll<PetGalleryPhotos>('petgalleryphotos');
      const sortedPhotos = items.sort((a, b) => {
        const dateA = a.uploadDate ? new Date(a.uploadDate).getTime() : 0;
        const dateB = b.uploadDate ? new Date(b.uploadDate).getTime() : 0;
        return dateB - dateA;
      });
      setPhotos(sortedPhotos);
      setFilteredPhotos(sortedPhotos);
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const petTypes = Array.from(new Set(photos.map((p) => p.petType).filter(Boolean)));

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
          <div className="mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-5xl lg:text-7xl text-foreground mb-6"
            >
              Pet Gallery
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-paragraph text-lg lg:text-xl text-foreground/80 max-w-3xl mb-8"
            >
              Browse through heartwarming moments captured by our community members. Share your pet's special memories.
            </motion.p>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search photos..."
                  className="pl-12 bg-secondary border-none text-secondary-foreground h-14 rounded-xl"
                />
              </div>
              <Select value={petTypeFilter} onValueChange={setPetTypeFilter}>
                <SelectTrigger className="w-full md:w-48 bg-secondary border-none text-secondary-foreground h-14 rounded-xl">
                  <SelectValue placeholder="Filter by pet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {petTypes.map((type) => (
                    <SelectItem key={type} value={type || ''}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-secondary border-none rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
                  {photo.photoFile && (
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={photo.photoFile}
                        alt={photo.photoTitle || 'Pet photo'}
                        width={500}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    {photo.photoTitle && (
                      <h3 className="font-heading text-xl text-secondary-foreground mb-2">
                        {photo.photoTitle}
                      </h3>
                    )}
                    {photo.caption && (
                      <p className="font-paragraph text-sm text-secondary-foreground/80 mb-4">
                        {photo.caption}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-secondary-foreground/60" />
                        <span className="font-paragraph text-xs text-secondary-foreground/70">
                          {photo.uploaderName || 'Anonymous'}
                        </span>
                      </div>
                      {photo.petType && (
                        <Badge variant="outline" className="border-secondary-foreground/20 text-secondary-foreground text-xs">
                          {photo.petType}
                        </Badge>
                      )}
                    </div>
                    {photo.uploadDate && (
                      <div className="flex items-center gap-2 mt-3">
                        <Calendar className="w-4 h-4 text-secondary-foreground/60" />
                        <span className="font-paragraph text-xs text-secondary-foreground/70">
                          {new Date(photo.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <Card className="bg-secondary border-none rounded-2xl">
              <CardContent className="p-12 text-center">
                <p className="font-paragraph text-lg text-secondary-foreground/70">
                  {searchQuery || petTypeFilter !== 'all'
                    ? 'No photos found matching your filters.'
                    : 'No photos in the gallery yet. Be the first to share!'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
