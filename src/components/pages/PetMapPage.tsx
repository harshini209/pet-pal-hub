import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { PetProfiles } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, Search, PawPrint } from 'lucide-react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function PetMapPage() {
  const [petProfiles, setPetProfiles] = useState<PetProfiles[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<PetProfiles[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPetProfiles();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = petProfiles.filter(
        (profile) =>
          profile.petLocation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.petType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.petName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProfiles(filtered);
    } else {
      setFilteredProfiles(petProfiles);
    }
  }, [searchQuery, petProfiles]);

  const loadPetProfiles = async () => {
    try {
      const { items } = await BaseCrudService.getAll<PetProfiles>('petprofiles');
      const profilesWithLocation = items.filter((p) => p.petLocation);
      setPetProfiles(profilesWithLocation);
      setFilteredProfiles(profilesWithLocation);
    } catch (error) {
      console.error('Error loading pet profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupByLocation = (profiles: PetProfiles[]) => {
    const grouped: { [key: string]: PetProfiles[] } = {};
    profiles.forEach((profile) => {
      const location = profile.petLocation || 'Unknown';
      if (!grouped[location]) {
        grouped[location] = [];
      }
      grouped[location].push(profile);
    });
    return grouped;
  };

  const groupedProfiles = groupByLocation(filteredProfiles);

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
              Pet Map
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-paragraph text-lg lg:text-xl text-foreground/80 max-w-3xl mb-8"
            >
              Discover pet owners near you. Connect with neighbors and arrange playdates for your furry friends.
            </motion.p>

            {/* Search */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by location, pet type, or name..."
                className="pl-12 bg-secondary border-none text-secondary-foreground h-14 rounded-xl"
              />
            </div>
          </div>

          {/* Map View - Location Groups */}
          <div className="space-y-8">
            {Object.entries(groupedProfiles).map(([location, profiles], index) => (
              <motion.div
                key={location}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-6 h-6 text-foreground" />
                    <h2 className="font-heading text-3xl lg:text-4xl text-foreground">{location}</h2>
                    <Badge className="bg-foreground text-background">{profiles.length}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {profiles.map((profile) => (
                    <Card key={profile._id} className="bg-secondary border-none rounded-2xl hover:scale-105 transition-transform duration-300">
                      <CardContent className="p-6">
                        {profile.profilePicture && (
                          <div className="w-20 h-20 rounded-full overflow-hidden mb-4 mx-auto bg-secondary-foreground/10">
                            <Image src={profile.profilePicture} alt={profile.petName || 'Pet'} className="w-full h-full object-cover" />
                          </div>
                        )}
                        {!profile.profilePicture && (
                          <div className="w-20 h-20 rounded-full bg-secondary-foreground/10 flex items-center justify-center mb-4 mx-auto">
                            <PawPrint className="w-10 h-10 text-secondary-foreground/50" />
                          </div>
                        )}
                        <h3 className="font-heading text-xl text-secondary-foreground text-center mb-2">
                          {profile.petName}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2">
                            <Badge variant="outline" className="border-secondary-foreground/20 text-secondary-foreground">
                              {profile.petType}
                            </Badge>
                            <Badge variant="outline" className="border-secondary-foreground/20 text-secondary-foreground">
                              {profile.petAge} {profile.petAge === 1 ? 'yr' : 'yrs'}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProfiles.length === 0 && (
            <Card className="bg-secondary border-none rounded-2xl">
              <CardContent className="p-12 text-center">
                <MapPin className="w-16 h-16 text-secondary-foreground/30 mx-auto mb-4" />
                <p className="font-paragraph text-lg text-secondary-foreground/70">
                  {searchQuery ? 'No pets found matching your search.' : 'No pet profiles with locations found yet.'}
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
