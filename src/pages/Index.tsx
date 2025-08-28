import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, CreditCard, Smartphone, Users, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import bankingHero from "@/assets/banking-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Banking Made
                <span className="block bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-transparent">
                  Simple & Secure
                </span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Experience the future of banking with our cutting-edge digital platform. 
                Manage your finances with confidence and ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary-glow text-primary-foreground hover:bg-primary-glow/10">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={bankingHero} 
                alt="Modern banking interface" 
                className="w-full h-auto rounded-2xl shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose SecureBank?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We combine cutting-edge technology with personalized service to deliver
              an exceptional banking experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Bank-Grade Security",
                description: "Your money and data are protected with military-grade encryption and fraud detection."
              },
              {
                icon: Smartphone,
                title: "Mobile First",
                description: "Manage your finances on-the-go with our award-winning mobile app."
              },
              {
                icon: CreditCard,
                title: "Smart Cards",
                description: "Contactless payments, rewards programs, and instant spending notifications."
              },
              {
                icon: Users,
                title: "24/7 Support",
                description: "Get help when you need it with our round-the-clock customer service team."
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 text-center shadow-card hover:shadow-elegant transition-shadow">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Everything you need in one place</h2>
              <div className="space-y-4">
                {[
                  "Zero monthly fees on checking accounts",
                  "High-yield savings with competitive rates",
                  "Real-time transaction notifications",
                  "Advanced budgeting and spending insights",
                  "Instant money transfers and bill pay",
                  "Investment options and financial planning tools"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/dashboard">
                  <Button variant="hero" size="lg">
                    Open Your Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:order-first">
              <Card className="p-8 shadow-elegant">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">$0</div>
                  <p className="text-muted-foreground mb-6">Monthly maintenance fee</p>
                  <div className="text-3xl font-bold text-primary mb-2">2.5%</div>
                  <p className="text-muted-foreground mb-6">APY on savings accounts</p>
                  <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                  <p className="text-muted-foreground">Customer support</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Ready to take control of your finances?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join over 1 million customers who trust SecureBank for their banking needs.
            Get started in under 5 minutes.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Start Banking Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
