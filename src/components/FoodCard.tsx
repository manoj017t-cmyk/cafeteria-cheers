import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

interface FoodCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  hasBogo?: boolean;
}

export function FoodCard({ id, name, description, price, image, isVeg, hasBogo }: FoodCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ id, name, price, image, isVeg, hasBogo });
    }
    setQuantity(1);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        {hasBogo && (
          <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground">
            Buy 1 Get 2
          </Badge>
        )}
        <Badge
          className={`absolute top-2 left-2 ${
            isVeg ? 'bg-veg' : 'bg-nonveg'
          } text-white border-0`}
        >
          {isVeg ? '🥬 Veg' : '🍗 Non-Veg'}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-heading font-bold text-lg mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-primary">₹{price}</span>
          {hasBogo && <span className="text-xs text-secondary font-semibold">Promo Active!</span>}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-3 font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleAddToCart} className="flex-1">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
