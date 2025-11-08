import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UtensilsCrossed, Zap, Shield } from 'lucide-react';
import heroImage from '@/assets/hero-food.jpg';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[600px] flex items-center justify-center text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4 text-foreground">
            Welcome to CampusBites
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Order, pay and collect — fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button size="lg" className="text-lg px-8">
                View Menu
              </Button>
            </Link>
            <Link to="/menu">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Today's Deals
              </Button>
            </Link>
          </div>
          <div className="mt-6 inline-block bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold">
            🎉 Buy 1 Get 2 on select items — limited time!
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">
            Why Choose CampusBites?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <UtensilsCrossed className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Fresh & Delicious</h3>
                <p className="text-muted-foreground">
                  All meals prepared fresh daily with quality ingredients
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                  <Zap className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Quick Service</h3>
                <p className="text-muted-foreground">
                  Order online and skip the queue with fast pickup
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/30 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Best Prices</h3>
                <p className="text-muted-foreground">
                  Student-friendly pricing with exclusive campus deals
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Browse our full menu and discover delicious meals waiting for you
          </p>
          <Link to="/menu">
            <Button size="lg" className="text-lg px-8">
              Place Order Now
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
