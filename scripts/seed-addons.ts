import { getLocalDB } from '../src/lib/db';
import { addOnServices } from '../src/lib/schema';

// Original add-on services data from Pricing.tsx
const staticAddOnServices = [
  {
    id: "additional_pages",
    name: "Additional Pages",
    price: "₱1,999",
    description: "Extra pages for your website",
    unit: "per page",
    category: "general",
    icon: "FileText",
    popular: false,
    displayOrder: 1,
    isActive: true
  },
  {
    id: "ai_content_generation",
    name: "AI Content Generation",
    price: "₱4,999",
    description: "AI-powered content creation",
    unit: "per package",
    category: "general",
    icon: "Bot",
    popular: true,
    displayOrder: 2,
    isActive: true
  },
  {
    id: "monthly_maintenance",
    name: "Monthly Maintenance",
    price: "₱3,999",
    description: "Ongoing support and updates",
    unit: "per month",
    category: "maintenance",
    icon: "Settings",
    popular: false,
    displayOrder: 3,
    isActive: true
  },
  {
    id: "seo_optimization",
    name: "Advanced SEO Package",
    price: "₱7,999",
    description: "Comprehensive SEO optimization",
    unit: "one-time",
    category: "seo",
    icon: "Search",
    popular: true,
    displayOrder: 4,
    isActive: true
  },
  {
    id: "e_commerce_integration",
    name: "E-commerce Integration",
    price: "₱15,999",
    description: "Payment gateway and shopping cart",
    unit: "one-time",
    category: "integration",
    icon: "ShoppingCart",
    popular: false,
    displayOrder: 5,
    isActive: true
  },
  {
    id: "custom_integrations",
    name: "Custom API Integration",
    price: "₱9,999",
    description: "Third-party service integrations",
    unit: "per integration",
    category: "integration",
    icon: "Plug",
    popular: false,
    displayOrder: 6,
    isActive: true
  }
];

async function seedAddOnServices() {
  console.log('Seeding add-on services...');
  
  try {
    const db = getLocalDB();
    
    // First, create the table if it doesn't exist
    try {
      await db.run(`CREATE TABLE IF NOT EXISTS "addon_services" (
        "id" text PRIMARY KEY NOT NULL,
        "name" text NOT NULL,
        "price" text NOT NULL,
        "description" text NOT NULL,
        "unit" text,
        "category" text DEFAULT 'general',
        "icon" text,
        "popular" integer DEFAULT 0 NOT NULL,
        "display_order" integer DEFAULT 0 NOT NULL,
        "is_active" integer DEFAULT 1 NOT NULL,
        "created_at" text DEFAULT CURRENT_TIMESTAMP,
        "updated_at" text DEFAULT CURRENT_TIMESTAMP
      )`);
      console.log('✓ Created addon_services table');
    } catch (error) {
      console.log('Table already exists or error creating it:', error);
    }
    
    // Clear existing add-on services
    await db.delete(addOnServices);
    console.log('✓ Cleared existing add-on services');
    
    // Insert each add-on service using Drizzle ORM
    for (const addon of staticAddOnServices) {
      await db.insert(addOnServices).values(addon);
      console.log(`✓ Inserted add-on service: ${addon.name}`);
    }
    
    console.log('\n🎉 Add-on services seeded successfully!');
    console.log(`Total add-ons inserted: ${staticAddOnServices.length}`);
    
    // Verify the data was inserted
    const result = await db.select().from(addOnServices);
    console.log(`\n✅ Verification: ${result.length} add-on services in database`);
    
    // Show categories breakdown
    const categories = result.reduce((acc, addon) => {
      acc[addon.category || 'general'] = (acc[addon.category || 'general'] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('\n📊 Categories breakdown:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`  - ${category}: ${count} add-ons`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding add-on services:', error);
    process.exit(1);
  }
}

seedAddOnServices();
