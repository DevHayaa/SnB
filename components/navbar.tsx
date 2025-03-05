"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMenuItems } from "@/lib/wordpress";

interface MenuItem {
  id: number;
  title: string;
  url: string;
  order: number;
  parent: number;
  children?: MenuItem[];
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 1, title: "COMPLIANCE", url: "/", order: 1, parent: 0 },
    { id: 2, title: "LEARNING", url: "/", order: 2, parent: 0 },
    { id: 3, title: "RESOURCES", url: "/", order: 3, parent: 0 },
    { id: 4, title: "ABOUT US", url: "/", order: 4, parent: 0 },
    { id: 5, title: "MEMBERSHIP", url: "/", order: 5, parent: 0 },
    { id: 6, title: "REGISTERATION", url: "/", order: 6, parent: 0 },
  ]);

  useEffect(() => {
    // Fetch menu items from WordPress
    const fetchMenu = async () => {
      try {
        const items = await getMenuItems("main-menu");
        console.log("Fetched Menu Items:", items); // Debugging
        if (items && items.length > 0) {
          setMenuItems(items);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
        // Keep default menu items on error
      }
    };

    fetchMenu();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[100px]">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="SNB Alliance Logo"
                width={180}
                height={60}
                className="mr-2"
              />
            </Link>
          </div>

          {/* Navigation links centered */}
          <div className="hidden md:flex flex-1 justify-center flex-wrap">
            <nav className="flex space-x-4">
              {menuItems.map((item) => (
                <Link 
                  key={item.id} 
                  href={item.url} 
                  className="text-[15px] font-medium hover:text-teal-700"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} aria-label="Menu">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t w-full px-4">
            <nav className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="text-gray-600 text-[15px] hover:text-teal-700 font-medium px-3 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
