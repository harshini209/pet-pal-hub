import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function TermsPage() {
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
              Terms of Service
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
                    Acceptance of Terms
                  </h2>
                  <p className="font-paragraph text-base text-secondary-foreground/80">
                    By accessing and using PetConnect, you accept and agree to be bound by the terms and provisions of 
                    this agreement. If you do not agree to these terms, please do not use our services.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading text-3xl text-secondary-foreground mb-4">
                    User Accounts
                  </h2>
                  <p className="font-paragraph text-base text-secondary-foreground/80 mb-4">
                    When you create an account with us, you must provide accurate and complete information. You are 
                    responsible for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-paragraph text-base text-secondary-foreground/80 ml-4">
                    <li>Maintaining the security of your account credentials</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us immediately of any unauthorized use</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-heading text-3xl text-secondary-foreground mb-4">
                    Community Guidelines
                  </h2>
                  <p className="font-paragraph text-base text-secondary-foreground/80 mb-4">
                    When using PetConnect, you agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 font-paragraph text-base text-secondary-foreground/80 ml-4">
                    <li>Treat other users with respect and kindness</li>
                    <li>Not post offensive, harmful, or inappropriate content</li>
                    <li>Not impersonate others or misrepresent your identity</li>
                    <li>Not use the platform for illegal activities</li>
                    <li>Respect the privacy of other users and their pets</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-heading text-3xl text-secondary-foreground mb-4">
                    Content Ownership
                  </h2>
                  <p className="font-paragraph text-base text-secondary-foreground/80">
                    You retain ownership of any content you post on PetConnect. However, by posting content, you grant 
                    us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display your content in 
                    connection with operating and promoting our services.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading text-3xl text-secondary-foreground mb-4">
                    Veterinary Services
                  </h2>
                  <p className="font-paragraph text-base text-secondary-foreground/80">
                    PetConnect provides a platform to connect with veterinarians but does not provide veterinary services 
                    directly. We are not responsible for the quality, accuracy, or outcomes of veterinary consultations. 
                    Always seek professional veterinary advice for serious health concerns.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading text-3xl text-secondary-foreground mb-4">
                    Limitation of Liability
                  </h2>
                  <p className="font-paragraph text-base text-secondary-foreground/80">
                    PetConnect is provided "as is" without warranties of any kind. We shall not be liable for any indirect, 
                    incidental, special, consequential, or punitive damages resulting from your use of or inability to use 
                    our services.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading text-3xl text-secondary-foreground mb-4">
                    Termination
                  </h2>
                  <p className="font-paragraph text-base text-secondary-foreground/80">
                    We reserve the right to terminate or suspend your account at any time, without prior notice, for 
                    conduct that we believe violates these Terms of Service or is harmful to other users, us, or third 
                    parties.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading text-3xl text-secondary-foreground mb-4">
                    Changes to Terms
                  </h2>
                  <p className="font-paragraph text-base text-secondary-foreground/80">
                    We may modify these terms at any time. We will notify users of any material changes. Your continued 
                    use of PetConnect after such modifications constitutes your acceptance of the updated terms.
                  </p>
                </section>

                <section>
                  <h2 className="font-heading text-3xl text-secondary-foreground mb-4">
                    Contact Information
                  </h2>
                  <p className="font-paragraph text-base text-secondary-foreground/80">
                    If you have any questions about these Terms of Service, please contact us at legal@petconnect.com
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
