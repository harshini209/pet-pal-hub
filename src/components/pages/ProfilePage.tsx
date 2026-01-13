import { useState, useEffect } from 'react';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { PetProfiles } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { User, PawPrint, MapPin, Calendar, Edit2, Save } from 'lucide-react';

export default function ProfilePage() {
  const { member } = useMember();
  const [petProfile, setPetProfile] = useState<PetProfiles | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    petName: '',
    petAge: 0,
    petType: '',
    petLocation: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPetProfile();
  }, [member]);

  const loadPetProfile = async () => {
    if (!member?._id) return;

    try {
      const { items } = await BaseCrudService.getAll<PetProfiles>('petprofiles');
      const userProfile = items.find((profile) => profile.ownerId === member._id);

      if (userProfile) {
        setPetProfile(userProfile);
        setFormData({
          petName: userProfile.petName || '',
          petAge: userProfile.petAge || 0,
          petType: userProfile.petType || '',
          petLocation: userProfile.petLocation || '',
        });
      } else {
        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error loading pet profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!member?._id) return;

    try {
      if (petProfile) {
        await BaseCrudService.update<PetProfiles>('petprofiles', {
          _id: petProfile._id,
          ...formData,
        });
      } else {
        await BaseCrudService.create('petprofiles', {
          _id: crypto.randomUUID(),
          ownerId: member._id,
          ...formData,
        });
      }
      await loadPetProfile();
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving pet profile:', error);
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
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <h1 className="font-heading text-4xl lg:text-6xl text-foreground mb-4">
              Your Profile
            </h1>
            <p className="font-paragraph text-lg text-foreground/80">
              Manage your account and pet information
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Member Information */}
            <Card className="bg-secondary border-none rounded-2xl">
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-secondary-foreground flex items-center gap-3">
                  <User className="w-6 h-6" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-paragraph text-sm text-secondary-foreground/70">Email</Label>
                  <p className="font-paragraph text-base text-secondary-foreground mt-1">
                    {member?.loginEmail || 'Not provided'}
                  </p>
                </div>
                <div>
                  <Label className="font-paragraph text-sm text-secondary-foreground/70">Display Name</Label>
                  <p className="font-paragraph text-base text-secondary-foreground mt-1">
                    {member?.profile?.nickname || member?.contact?.firstName || 'Not set'}
                  </p>
                </div>
                <div>
                  <Label className="font-paragraph text-sm text-secondary-foreground/70">Member Since</Label>
                  <p className="font-paragraph text-base text-secondary-foreground mt-1">
                    {member?._createdDate ? new Date(member._createdDate).toLocaleDateString() : 'Unknown'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Pet Profile */}
            <Card className="bg-secondary border-none rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-heading text-2xl text-secondary-foreground flex items-center gap-3">
                  <PawPrint className="w-6 h-6" />
                  Pet Profile
                </CardTitle>
                {!isEditing && petProfile && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                    className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="petName" className="font-paragraph text-sm text-secondary-foreground/70">
                        Pet Name
                      </Label>
                      <Input
                        id="petName"
                        value={formData.petName}
                        onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                        className="mt-1 bg-background border-secondary-foreground/20 text-foreground"
                        placeholder="Enter your pet's name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="petAge" className="font-paragraph text-sm text-secondary-foreground/70">
                        Pet Age (years)
                      </Label>
                      <Input
                        id="petAge"
                        type="number"
                        value={formData.petAge}
                        onChange={(e) => setFormData({ ...formData, petAge: parseInt(e.target.value) || 0 })}
                        className="mt-1 bg-background border-secondary-foreground/20 text-foreground"
                        placeholder="Enter your pet's age"
                      />
                    </div>
                    <div>
                      <Label htmlFor="petType" className="font-paragraph text-sm text-secondary-foreground/70">
                        Pet Type
                      </Label>
                      <Input
                        id="petType"
                        value={formData.petType}
                        onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                        className="mt-1 bg-background border-secondary-foreground/20 text-foreground"
                        placeholder="e.g., Dog, Cat, Bird"
                      />
                    </div>
                    <div>
                      <Label htmlFor="petLocation" className="font-paragraph text-sm text-secondary-foreground/70">
                        Location
                      </Label>
                      <Input
                        id="petLocation"
                        value={formData.petLocation}
                        onChange={(e) => setFormData({ ...formData, petLocation: e.target.value })}
                        className="mt-1 bg-background border-secondary-foreground/20 text-foreground"
                        placeholder="Enter your location"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleSave}
                        className="flex-1 bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Profile
                      </Button>
                      {petProfile && (
                        <Button
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({
                              petName: petProfile.petName || '',
                              petAge: petProfile.petAge || 0,
                              petType: petProfile.petType || '',
                              petLocation: petProfile.petLocation || '',
                            });
                          }}
                          variant="outline"
                          className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                ) : petProfile ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <PawPrint className="w-5 h-5 text-secondary-foreground/70" />
                      <div>
                        <Label className="font-paragraph text-sm text-secondary-foreground/70">Name</Label>
                        <p className="font-paragraph text-base text-secondary-foreground">{petProfile.petName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-secondary-foreground/70" />
                      <div>
                        <Label className="font-paragraph text-sm text-secondary-foreground/70">Age</Label>
                        <p className="font-paragraph text-base text-secondary-foreground">
                          {petProfile.petAge} {petProfile.petAge === 1 ? 'year' : 'years'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <PawPrint className="w-5 h-5 text-secondary-foreground/70" />
                      <div>
                        <Label className="font-paragraph text-sm text-secondary-foreground/70">Type</Label>
                        <p className="font-paragraph text-base text-secondary-foreground">{petProfile.petType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-secondary-foreground/70" />
                      <div>
                        <Label className="font-paragraph text-sm text-secondary-foreground/70">Location</Label>
                        <p className="font-paragraph text-base text-secondary-foreground">{petProfile.petLocation}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="font-paragraph text-base text-secondary-foreground/70">
                    No pet profile created yet. Click Edit to create one.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
