import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

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
              Get in Touch
            </h1>
            <p className="font-paragraph text-lg lg:text-xl text-foreground/80 max-w-3xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Reach out and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="bg-secondary border-none rounded-2xl">
                <CardContent className="p-8 lg:p-12">
                  <h2 className="font-heading text-3xl text-secondary-foreground mb-8">
                    Send us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="font-paragraph text-sm text-secondary-foreground/70 mb-2 block">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-background border-secondary-foreground/20 text-foreground"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="font-paragraph text-sm text-secondary-foreground/70 mb-2 block">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-background border-secondary-foreground/20 text-foreground"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject" className="font-paragraph text-sm text-secondary-foreground/70 mb-2 block">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="bg-background border-secondary-foreground/20 text-foreground"
                        placeholder="What's this about?"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="font-paragraph text-sm text-secondary-foreground/70 mb-2 block">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        className="bg-background border-secondary-foreground/20 text-foreground min-h-[160px]"
                        placeholder="Tell us what's on your mind..."
                      />
                    </div>
                    {submitted && (
                      <div className="bg-secondary-foreground/10 border border-secondary-foreground/20 rounded-xl p-4">
                        <p className="font-paragraph text-sm text-secondary-foreground text-center">
                          Thank you for your message! We'll get back to you soon.
                        </p>
                      </div>
                    )}
                    <Button
                      type="submit"
                      className="w-full bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90 h-12"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <Card className="bg-secondary border-none rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 border-2 border-secondary-foreground rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl text-secondary-foreground mb-2">Email</h3>
                      <p className="font-paragraph text-base text-secondary-foreground/80">
                        hello@petconnect.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 border-2 border-secondary-foreground rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl text-secondary-foreground mb-2">Phone</h3>
                      <p className="font-paragraph text-base text-secondary-foreground/80">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 border-2 border-secondary-foreground rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl text-secondary-foreground mb-2">Address</h3>
                      <p className="font-paragraph text-base text-secondary-foreground/80">
                        123 Pet Street<br />
                        Animal City, PC 12345
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-secondary border-none rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="font-heading text-xl text-secondary-foreground mb-4">Office Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-paragraph text-sm text-secondary-foreground/70">Monday - Friday</span>
                      <span className="font-paragraph text-sm text-secondary-foreground">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-paragraph text-sm text-secondary-foreground/70">Saturday</span>
                      <span className="font-paragraph text-sm text-secondary-foreground">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-paragraph text-sm text-secondary-foreground/70">Sunday</span>
                      <span className="font-paragraph text-sm text-secondary-foreground">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
