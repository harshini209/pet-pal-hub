import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { VeterinaryDirectory } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, ExternalLink, Stethoscope, Video } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VetsPage() {
  const [vets, setVets] = useState<VeterinaryDirectory[]>([]);
  const [filteredVets, setFilteredVets] = useState<VeterinaryDirectory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVets();
  }, []);

  useEffect(() => {
    let filtered = vets;

    if (specialtyFilter !== 'all') {
      filtered = filtered.filter((vet) => vet.specialty === specialtyFilter);
    }

    if (locationFilter !== 'all') {
      filtered = filtered.filter((vet) => vet.location === locationFilter);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (vet) =>
          vet.vetName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vet.bio?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredVets(filtered);
  }, [searchQuery, specialtyFilter, locationFilter, vets]);

  const loadVets = async () => {
    try {
      const { items } = await BaseCrudService.getAll<VeterinaryDirectory>('veterinarydirectory');
      setVets(items);
      setFilteredVets(items);
    } catch (error) {
      console.error('Error loading vets:', error);
    } finally {
      setLoading(false);
    }
  };

  const specialties = Array.from(new Set(vets.map((v) => v.specialty).filter(Boolean)));
  const locations = Array.from(new Set(vets.map((v) => v.location).filter(Boolean)));

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
              Veterinary Directory
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-paragraph text-lg lg:text-xl text-foreground/80 max-w-3xl mb-8"
            >
              Connect with certified veterinarians for online consultations, emergency care, and expert advice for your beloved pets.
            </motion.p>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 max-w-6xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search veterinarians..."
                  className="pl-12 bg-secondary border-none text-secondary-foreground h-14 rounded-xl"
                />
              </div>
              <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                <SelectTrigger className="w-full lg:w-48 bg-secondary border-none text-secondary-foreground h-14 rounded-xl">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty || ''}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full lg:w-48 bg-secondary border-none text-secondary-foreground h-14 rounded-xl">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location || ''}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Vets Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredVets.map((vet, index) => (
              <motion.div
                key={vet._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-secondary border-none rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 h-full flex flex-col">
                  {vet.profilePicture && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <Image
                        src={vet.profilePicture}
                        alt={vet.vetName || 'Veterinarian'}
                        width={500}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6 lg:p-8 flex-1 flex flex-col">
                    <div className="mb-4">
                      <h3 className="font-heading text-2xl text-secondary-foreground mb-2">
                        {vet.vetName}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {vet.specialty && (
                          <Badge className="bg-secondary-foreground text-secondary">
                            <Stethoscope className="w-3 h-3 mr-1" />
                            {vet.specialty}
                          </Badge>
                        )}
                        {vet.location && (
                          <Badge variant="outline" className="border-secondary-foreground/20 text-secondary-foreground">
                            <MapPin className="w-3 h-3 mr-1" />
                            {vet.location}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {vet.bio && (
                      <p className="font-paragraph text-base text-secondary-foreground/80 mb-6 flex-1">
                        {vet.bio.length > 150 ? `${vet.bio.substring(0, 150)}...` : vet.bio}
                      </p>
                    )}
                    {vet.onlineConsultationUrl && (
                      <a
                        href={vet.onlineConsultationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button className="w-full bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90">
                          <Video className="w-4 h-4 mr-2" />
                          Book Consultation
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredVets.length === 0 && (
            <Card className="bg-secondary border-none rounded-2xl">
              <CardContent className="p-12 text-center">
                <Stethoscope className="w-16 h-16 text-secondary-foreground/30 mx-auto mb-4" />
                <p className="font-paragraph text-lg text-secondary-foreground/70">
                  {searchQuery || specialtyFilter !== 'all' || locationFilter !== 'all'
                    ? 'No veterinarians found matching your filters.'
                    : 'No veterinarians available yet.'}
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
