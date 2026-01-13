import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Globe, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We believe in treating every pet and owner with care, empathy, and understanding.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building connections between pet owners to share experiences and support each other.',
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making pet care resources and veterinary services available to everyone, everywhere.',
    },
    {
      icon: Shield,
      title: 'Trust',
      description: 'Creating a safe, reliable platform where pet owners can connect with confidence.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-16 lg:py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-5xl lg:text-7xl text-foreground mb-6">
              About PetConnect
            </h1>
            <p className="font-paragraph text-lg lg:text-xl text-foreground/80 max-w-3xl mx-auto">
              Bringing pet owners together through shared experiences, expert resources, and compassionate care.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <Card className="bg-secondary border-none rounded-2xl">
              <CardContent className="p-8 lg:p-12">
                <h2 className="font-heading text-3xl lg:text-4xl text-secondary-foreground mb-6">
                  Our Mission
                </h2>
                <p className="font-paragraph text-lg text-secondary-foreground/80 mb-4">
                  PetConnect was created with a simple yet powerful vision: to unite pet owners worldwide in a supportive, 
                  informative, and engaging community. We understand that pets are family, and caring for them requires 
                  knowledge, resources, and sometimes just a friendly ear from someone who understands.
                </p>
                <p className="font-paragraph text-lg text-secondary-foreground/80">
                  Our platform connects you with fellow pet enthusiasts, provides access to expert veterinary care, 
                  and offers comprehensive behavioral resources—all in one place. Whether you're seeking advice, 
                  sharing adorable moments, or finding emergency care, PetConnect is here for you and your beloved companion.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="mb-16">
            <h2 className="font-heading text-4xl lg:text-5xl text-foreground text-center mb-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="bg-secondary border-none rounded-2xl h-full">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 border-2 border-secondary-foreground rounded-full flex items-center justify-center mx-auto mb-6">
                          <Icon className="w-8 h-8 text-secondary-foreground" />
                        </div>
                        <h3 className="font-heading text-2xl text-secondary-foreground mb-4">
                          {value.title}
                        </h3>
                        <p className="font-paragraph text-base text-secondary-foreground/80">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
