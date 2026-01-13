import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="font-paragraph text-lg text-foreground/80 max-w-3xl mx-auto">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-secondary border-none rounded-2xl">
              <CardContent className="p-8 lg:p-12 space-y-8">
                <section>
                  <h2 className="font-heading text-3xl text-secondary-foreground mb-4">
                    Introduction
                  </h2>
                  <p className="font-paragraph text-base text-secondary-foreground/80">
                    At PetConnect, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
                    disclose, and safeguard your information when you use our platform. Please read this policy carefully 
                    to understand our practices regarding your personal data.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading text-3xl text-secondary-foreground mb-4">
                    Information We Collect
                  </h2>
                  <p className="font-paragraph text-base text-secondary-foreground/80 mb-4">
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-paragraph text-base text-secondary-foreground/80 ml-4">
                    <li>Account information (name, email address, password)</li>
                    <li>Pet profile information (pet name, age, type, location)</li>
                    <li>Community posts and interactions</li>
                    <li>Photos and captions you upload to the gallery</li>
                    <li>Communications with veterinarians and other users</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-heading text-3xl text-secondary-foreground mb-4">
                    How We Use Your Information
                  </h2>
                  <p className="font-paragraph text-base text-secondary-foreground/80 mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-paragraph text-base text-secondary-foreground/80 ml-4">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Connect you with other pet owners and veterinarians</li>
                    <li>Display your pet's location on the Pet Map (with your consent)</li>
                    <li>Send you updates, newsletters, and promotional materials</li>
                    <li>Respond to your comments, questions, and requests</li>
                    <li>Protect against fraudulent or illegal activity</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-heading text-3xl text-secondary-foreground mb-4">
                    Information Sharing
                  </h2>
                  <p className="font-paragraph text-base text-secondary-foreground/80">
                    We do not sell your personal information. We may share your information with third parties only in 
                    the following circumstances: with your consent, to comply with legal obligations, to protect our 
                    rights and safety, or with service providers who assist us in operating our platform.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading text-3xl text-secondary-foreground mb-4">
                    Data Security
                  </h2>
                  <p className="font-paragraph text-base text-secondary-foreground/80">
                    We implement appropriate technical and organizational measures to protect your personal information 
                    against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                    over the internet is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading text-3xl text-secondary-foreground mb-4">
                    Your Rights
                  </h2>
                  <p className="font-paragraph text-base text-secondary-foreground/80 mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-paragraph text-base text-secondary-foreground/80 ml-4">
                    <li>Access and update your personal information</li>
                    <li>Delete your account and associated data</li>
                    <li>Opt out of marketing communications</li>
                    <li>Request a copy of your data</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-heading text-3xl text-secondary-foreground mb-4">
                    Contact Us
                  </h2>
                  <p className="font-paragraph text-base text-secondary-foreground/80">
                    If you have any questions about this Privacy Policy, please contact us at privacy@petconnect.com
                  </p>
                </section>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
