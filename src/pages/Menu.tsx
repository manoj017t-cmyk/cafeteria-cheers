import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FoodCard } from '@/components/FoodCard';
import burgerImg from '@/assets/burger.jpg';
import pizzaImg from '@/assets/pizza.jpg';
import sandwichImg from '@/assets/sandwich.jpg';
import drinksImg from '@/assets/drinks.jpg';
import thaliImg from '@/assets/thali.jpg';

const menuItems = [
  { id: 1, name: 'Classic Burger', description: 'Juicy beef patty with cheese and fresh veggies', price: 120, image: burgerImg, isVeg: false, category: 'Snacks', hasBogo: true },
  { id: 2, name: 'Veggie Pizza', description: 'Fresh vegetables with mozzarella cheese', price: 180, image: pizzaImg, isVeg: true, category: 'Lunch', hasBogo: false },
  { id: 3, name: 'Club Sandwich', description: 'Triple decker with layers of goodness', price: 100, image: sandwichImg, isVeg: true, category: 'Breakfast', hasBogo: true },
  { id: 4, name: 'Fresh Smoothies', description: 'Refreshing fruit smoothies and cold drinks', price: 60, image: drinksImg, isVeg: true, category: 'Drinks', hasBogo: false },
  { id: 5, name: 'Special Thali', description: 'Complete Indian meal with rice, curry, and naan', price: 150, image: thaliImg, isVeg: true, category: 'Lunch', hasBogo: true },
  { id: 6, name: 'Cheese Burger', description: 'Double cheese patty with special sauce', price: 140, image: burgerImg, isVeg: false, category: 'Snacks', hasBogo: false },
];

export default function Menu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold mb-2">Our Menu</h1>
          <p className="text-muted-foreground">Delicious food, delivered fresh to you</p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="Breakfast">Breakfast</SelectItem>
              <SelectItem value="Lunch">Lunch</SelectItem>
              <SelectItem value="Snacks">Snacks</SelectItem>
              <SelectItem value="Drinks">Drinks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found matching your criteria</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-heading font-semibold mb-4">
                {categoryFilter === 'All' ? 'All Items' : categoryFilter}
              </h2>
              <p className="text-sm text-muted-foreground">
                {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} available
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <FoodCard key={item.id} {...item} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
