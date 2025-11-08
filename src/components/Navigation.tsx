import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';

export function Navigation() {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-primary" />
          <span className="text-xl font-heading font-bold text-foreground">
            CampusBites
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`font-medium transition-colors ${
              isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Home
          </Link>
          <Link
            to="/menu"
            className={`font-medium transition-colors ${
              isActive('/menu') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Menu
          </Link>
          <Link
            to="/cart"
            className={`font-medium transition-colors ${
              isActive('/cart') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Orders
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
