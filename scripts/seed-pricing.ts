import { getLocalDB } from '../src/lib/db';
import { pricingPlans } from '../src/lib/schema';

// Static pricing data from Pricing.tsx
const webDevelopmentPlans = [
  {
    id: "landing_page",
    name: "Landing Page",
    price: "₱9,999",
    period: "- ₱25,999",
    description: "Perfect for startups and small businesses",
    features: [
      "48-hour delivery guaranteed",
      "1 professional responsive page",
      "AI chat widget integration",
      "Basic SEO optimization",
      "Google Analytics setup",
      "Mobile-first design",
      "1 round of revisions"
    ],
    buttonText: "Get Started",
    buttonVariant: "gradient",
    popular: true,
    timeline: "48 hours",
    displayOrder: 1,
    category: "web",
    isActive: true
  },
  {
    id: "basic_website",
    name: "Basic Website",
    price: "₱19,999",
    period: "- ₱39,999",
    description: "Ideal for growing businesses",
    features: [
      "5-7 days delivery",
      "3-5 static pages",
      "AI chat widget",
      "SEO optimization",
      "Contact forms",
      "Analytics integration",
      "2 rounds of revisions",
      "Basic blog setup"
    ],
    buttonText: "Choose Plan",
    buttonVariant: "outline",
    popular: false,
    timeline: "5-7 days",
    displayOrder: 2,
    category: "web",
    isActive: true
  },
  {
    id: "advanced_website",
    name: "Advanced Website",
    price: "₱49,999",
    period: "- ₱89,999",
    description: "For established businesses",
    features: [
      "2-3 weeks delivery",
      "8-12 pages with CMS",
      "Advanced AI features",
      "E-commerce ready",
      "Blog setup",
      "Advanced SEO & analytics",
      "3 rounds of revisions",
      "Performance optimization"
    ],
    buttonText: "Choose Plan",
    buttonVariant: "outline",
    popular: false,
    timeline: "2-3 weeks",
    displayOrder: 3,
    category: "web",
    isActive: true
  }
];

const mobileAppPlans = [
  {
    id: "basic_mobile_app",
    name: "Basic Mobile App",
    price: "₱89,999",
    period: "- ₱199,999",
    description: "Cross-platform mobile solution",
    features: [
      "4-6 weeks delivery",
      "iOS & Android compatible",
      "Basic AI integration",
      "User authentication",
      "Push notifications",
      "App store submission",
      "3 months support",
      "Basic analytics"
    ],
    buttonText: "Get Quote",
    buttonVariant: "outline",
    popular: false,
    timeline: "4-6 weeks",
    displayOrder: 1,
    category: "mobile",
    isActive: true
  },
  {
    id: "advanced_mobile_app",
    name: "Advanced Mobile App",
    price: "₱299,999",
    period: "- ₱999,999",
    description: "Enterprise-grade mobile application",
    features: [
      "8-12 weeks delivery",
      "Advanced AI features",
      "Backend API development",
      "Real-time features",
      "Advanced security",
      "Custom integrations",
      "6 months support",
      "Advanced analytics & reporting"
    ],
    buttonText: "Get Quote",
    buttonVariant: "gradient",
    popular: true,
    timeline: "8-12 weeks",
    displayOrder: 2,
    category: "mobile",
    isActive: true
  }
];

async function seedPricingData() {
  console.log('Seeding pricing data...');
  
  try {
    const db = getLocalDB();
    
    // Combine all pricing plans
    const allPlans = [...webDevelopmentPlans, ...mobileAppPlans];
    
    // Note: category column should already exist from schema
    console.log('Using existing pricing_plans table with category column');
    
    // Clear existing pricing plans
    await db.delete(pricingPlans);
    console.log('Cleared existing pricing plans');
    
    // Insert each pricing plan using Drizzle ORM
    for (const plan of allPlans) {
      const planData = {
        id: plan.id,
        name: plan.name,
        price: plan.price,
        period: plan.period || '',
        description: plan.description,
        features: JSON.stringify(plan.features),
        buttonText: plan.buttonText,
        buttonVariant: plan.buttonVariant,
        popular: plan.popular,
        timeline: plan.timeline,
        displayOrder: plan.displayOrder,
        category: plan.category,
        isActive: plan.isActive
      };
      
      await db.insert(pricingPlans).values(planData);
      console.log(`✓ Inserted pricing plan: ${plan.name}`);
    }
    
    console.log('\nPricing data seeded successfully!');
    console.log(`Total plans inserted: ${allPlans.length}`);
    console.log(`- Web development plans: ${webDevelopmentPlans.length}`);
    console.log(`- Mobile app plans: ${mobileAppPlans.length}`);
    
    // Verify the data was inserted
    const result = await db.select().from(pricingPlans);
    console.log(`\nVerification: ${result.length} plans in database`);
    
  } catch (error) {
    console.error('Error seeding pricing data:', error);
    process.exit(1);
  }
}

seedPricingData();
