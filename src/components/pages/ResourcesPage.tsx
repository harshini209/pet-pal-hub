import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { BehavioralResources } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ExternalLink, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResourcesPage() {
  const [resources, setResources] = useState<BehavioralResources[]>([]);
  const [filteredResources, setFilteredResources] = useState<BehavioralResources[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [petTypeFilter, setPetTypeFilter] = useState('all');
  const [problemFilter, setProblemFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  useEffect(() => {
    let filtered = resources;

    if (petTypeFilter !== 'all') {
      filtered = filtered.filter((resource) => resource.petType === petTypeFilter);
    }

    if (problemFilter !== 'all') {
      filtered = filtered.filter((resource) => resource.problemArea === problemFilter);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (resource) =>
          resource.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.content?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredResources(filtered);
  }, [searchQuery, petTypeFilter, problemFilter, resources]);

  const loadResources = async () => {
    try {
      const { items } = await BaseCrudService.getAll<BehavioralResources>('behavioralresources');
      setResources(items);
      setFilteredResources(items);
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const petTypes = Array.from(new Set(resources.map((r) => r.petType).filter(Boolean)));
  const problemAreas = Array.from(new Set(resources.map((r) => r.problemArea).filter(Boolean)));

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
              Behavioral Resources
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-paragraph text-lg lg:text-xl text-foreground/80 max-w-3xl mb-8"
            >
              Expert guidance and solutions for common pet behavioral challenges. Find resources tailored to your pet's needs.
            </motion.p>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 max-w-6xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search resources..."
                  className="pl-12 bg-secondary border-none text-secondary-foreground h-14 rounded-xl"
                />
              </div>
              <Select value={petTypeFilter} onValueChange={setPetTypeFilter}>
                <SelectTrigger className="w-full lg:w-48 bg-secondary border-none text-secondary-foreground h-14 rounded-xl">
                  <SelectValue placeholder="Pet Type" />
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
              <Select value={problemFilter} onValueChange={setProblemFilter}>
                <SelectTrigger className="w-full lg:w-48 bg-secondary border-none text-secondary-foreground h-14 rounded-xl">
                  <SelectValue placeholder="Problem Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Problems</SelectItem>
                  {problemAreas.map((area) => (
                    <SelectItem key={area} value={area || ''}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-secondary border-none rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 h-full">
                  <div className="grid md:grid-cols-5 h-full">
                    {resource.thumbnailImage && (
                      <div className="md:col-span-2 aspect-square md:aspect-auto overflow-hidden">
                        <Image
                          src={resource.thumbnailImage}
                          alt={resource.title || 'Resource'}
                          width={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className={`${resource.thumbnailImage ? 'md:col-span-3' : 'md:col-span-5'} p-6 lg:p-8 flex flex-col`}>
                      <div className="flex items-start gap-3 mb-4">
                        <BookOpen className="w-6 h-6 text-secondary-foreground/70 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-heading text-2xl text-secondary-foreground mb-3">
                            {resource.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {resource.petType && (
                              <Badge className="bg-secondary-foreground text-secondary">
                                {resource.petType}
                              </Badge>
                            )}
                            {resource.problemArea && (
                              <Badge variant="outline" className="border-secondary-foreground/20 text-secondary-foreground">
                                {resource.problemArea}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      {resource.content && (
                        <p className="font-paragraph text-base text-secondary-foreground/80 mb-6 flex-1">
                          {resource.content.length > 200
                            ? `${resource.content.substring(0, 200)}...`
                            : resource.content}
                        </p>
                      )}
                      {resource.externalLink && (
                        <a
                          href={resource.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-paragraph text-sm text-secondary-foreground hover:opacity-70 transition-opacity"
                        >
                          Read More
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <Card className="bg-secondary border-none rounded-2xl">
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-secondary-foreground/30 mx-auto mb-4" />
                <p className="font-paragraph text-lg text-secondary-foreground/70">
                  {searchQuery || petTypeFilter !== 'all' || problemFilter !== 'all'
                    ? 'No resources found matching your filters.'
                    : 'No behavioral resources available yet.'}
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
