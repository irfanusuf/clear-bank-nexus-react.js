import { Link } from "react-router-dom";
import { Button } from "@/components/ui/enhanced-button";
import { 
  Shield, 
  TrendingUp, 
  Users, 
  CreditCard, 
  Smartphone, 
  Lock, 
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  Building,
  Banknote,
  PiggyBank,
  Wallet
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/95 border-b border-border">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Building className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ClearBank Nexus
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
              <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
              <a href="#security" className="text-foreground hover:text-primary transition-colors">Security</a>
              <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">Testimonials</a>
            </div>
            <div className="flex gap-4">
              <Link to="/login">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="banking" size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Banking Made Simple,
            <br />
            Secure & Smart
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Experience next-generation banking with ClearBank Nexus. Manage your finances with confidence through our secure, intuitive platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup">
              <Button variant="banking" size="lg" className="gap-2">
                Open Account <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Existing Customer
              </Button>
            </Link>
          </div>
          <div className="flex gap-8 justify-center mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" />
              <span>Bank-Grade Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-accent" />
              <span>2M+ Happy Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-accent" />
              <span>Licensed & Regulated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose ClearBank Nexus?</h2>
            <p className="text-xl text-muted-foreground">Banking features designed for the modern world</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-card hover:shadow-banking transition-all">
              <div className="bg-gradient-primary p-3 rounded-lg w-fit mb-4">
                <Smartphone className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile Banking</h3>
              <p className="text-muted-foreground">Access your account anytime, anywhere with our secure mobile platform</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-card hover:shadow-banking transition-all">
              <div className="bg-gradient-primary p-3 rounded-lg w-fit mb-4">
                <CreditCard className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Transfers</h3>
              <p className="text-muted-foreground">Send and receive money instantly with zero processing delays</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-card hover:shadow-banking transition-all">
              <div className="bg-gradient-primary p-3 rounded-lg w-fit mb-4">
                <Lock className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Security</h3>
              <p className="text-muted-foreground">Multi-layer encryption and biometric authentication for your peace of mind</p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-card hover:shadow-banking transition-all">
              <div className="bg-gradient-primary p-3 rounded-lg w-fit mb-4">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Analytics</h3>
              <p className="text-muted-foreground">Track spending patterns and get insights to manage finances better</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Complete Banking Services</h2>
            <p className="text-xl text-muted-foreground">Everything you need in one place</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-primary p-4 rounded-full w-fit mx-auto mb-4">
                <Wallet className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Personal Banking</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2 justify-center">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Savings & Current Accounts
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Fixed Deposits
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Personal Loans
                </li>
              </ul>
            </div>
            <div className="text-center">
              <div className="bg-gradient-primary p-4 rounded-full w-fit mx-auto mb-4">
                <Banknote className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Business Banking</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2 justify-center">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Business Accounts
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Merchant Services
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Corporate Cards
                </li>
              </ul>
            </div>
            <div className="text-center">
              <div className="bg-gradient-primary p-4 rounded-full w-fit mx-auto mb-4">
                <PiggyBank className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Investment</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2 justify-center">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Mutual Funds
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Stock Trading
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Portfolio Management
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 px-6 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Your Security is Our Priority</h2>
              <p className="text-xl mb-8 opacity-90">
                We employ industry-leading security measures to protect your money and personal information.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">256-bit Encryption</h4>
                    <p className="opacity-90">Military-grade encryption for all transactions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Multi-Factor Authentication</h4>
                    <p className="opacity-90">Extra layers of security for account access</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">24/7 Fraud Monitoring</h4>
                    <p className="opacity-90">Real-time monitoring to detect suspicious activities</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="text-center">
                  <Shield className="h-24 w-24 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Bank-Grade Security</h3>
                  <p className="opacity-90">Licensed and regulated by financial authorities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground">Join thousands of satisfied customers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-card">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "ClearBank Nexus has transformed how I manage my finances. The mobile app is intuitive and secure."
              </p>
              <div className="font-semibold">Sarah Johnson</div>
              <div className="text-sm text-muted-foreground">Small Business Owner</div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-card">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Excellent customer service and the best interest rates I've found. Highly recommended!"
              </p>
              <div className="font-semibold">Michael Chen</div>
              <div className="text-sm text-muted-foreground">Software Engineer</div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-card">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "The investment tools and analytics have helped me grow my portfolio significantly."
              </p>
              <div className="font-semibold">Emily Rodriguez</div>
              <div className="text-sm text-muted-foreground">Marketing Manager</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-primary-foreground">
            Ready to Start Your Banking Journey?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join ClearBank Nexus today and experience the future of banking
          </p>
          <Link to="/signup">
            <Button variant="premium" size="lg" className="gap-2">
              Open Your Account Now <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building className="h-6 w-6" />
                <span className="text-xl font-bold">ClearBank Nexus</span>
              </div>
              <p className="opacity-90">Your trusted partner for modern banking solutions</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 opacity-90">
                <li><a href="#" className="hover:underline">Personal Banking</a></li>
                <li><a href="#" className="hover:underline">Business Banking</a></li>
                <li><a href="#" className="hover:underline">Loans</a></li>
                <li><a href="#" className="hover:underline">Investments</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 opacity-90">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Press</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 opacity-90">
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms of Service</a></li>
                <li><a href="#" className="hover:underline">Security</a></li>
                <li><a href="#" className="hover:underline">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center opacity-90">
            <p>&copy; 2024 ClearBank Nexus. All rights reserved. Member FDIC.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
