-- Seed data for Lunaxcode CMS

-- Insert pricing plans
INSERT INTO `pricing_plans` (`id`, `name`, `price`, `description`, `features`, `timeline`, `display_order`) VALUES
('landing_page', 'Landing Page', '₱8,000', 'Professional single-page website with AI chat widget', '["Responsive design for all devices","AI-powered chat widget included","SEO optimization","Contact form integration","Google Analytics setup","48-hour delivery guarantee"]', '48 hours', 1),
('basic_website', 'Basic Website', '₱18,000', '3-5 page website with AI features and SEO optimization', '["Up to 5 pages","Content Management System","Advanced SEO optimization","AI chat widget","Social media integration","Mobile-first design","Contact forms","Google Analytics & Search Console"]', '5-7 days', 2),
('premium_website', 'Premium Website', '₱45,000', 'Advanced website with e-commerce and custom features', '["Up to 15 pages","Full e-commerce integration","Advanced CMS","AI chat widget","Payment gateway setup","Advanced SEO","Custom animations","Priority support"]', '2-3 weeks', 3),
('mobile_app', 'Mobile App', '₱89,999', 'Cross-platform mobile app with backend integration', '["iOS & Android apps","Custom UI/UX design","Backend API development","User authentication","Push notifications","App store deployment","3 months support"]', '4-12 weeks', 4);

-- Insert features
INSERT INTO `features` (`title`, `description`, `icon`, `color`, `display_order`) VALUES
('48-Hour Landing Pages', 'While competitors take 3-5 days minimum, we deliver professional landing pages in just 48 hours. No compromises on quality.', 'Zap', 'from-yellow-400 to-orange-500', 1),
('Full Website Development', 'Complete websites with CMS, advanced SEO, and multi-page functionality delivered in 5 days to 3 weeks depending on complexity.', 'Globe', 'from-blue-400 to-cyan-500', 2),
('Mobile App Development', 'Cross-platform iOS and Android apps with modern UI/UX, backend integration, and push notifications in 4-12 weeks.', 'Smartphone', 'from-green-400 to-emerald-500', 3),
('AI Integration Included', 'Every project comes with intelligent AI features - chat widgets for websites, smart features for mobile apps.', 'Bot', 'from-purple-400 to-pink-500', 4),
('SME-Friendly Pricing', 'Starting at just ₱8,000 for landing pages, ₱18,000 for websites, and ₱80,000 for mobile apps. Affordable for all business sizes.', 'DollarSign', 'from-red-400 to-rose-500', 5),
('AI-Powered Development', 'Using cutting-edge AI tools to accelerate development while maintaining high quality and modern design standards across all services.', 'Cpu', 'from-indigo-400 to-blue-500', 6);

-- Insert process steps
INSERT INTO `process_steps` (`step_number`, `title`, `description`, `icon`, `display_order`) VALUES
(1, 'Discovery & Planning', 'We start with a comprehensive consultation to understand your business goals, target audience, and project requirements.', 'Search', 1),
(2, 'Design & Development', 'Our team creates custom designs and develops your solution using the latest technologies and best practices.', 'Code', 2),
(3, 'Testing & Optimization', 'Rigorous testing across all devices and browsers ensures your project works perfectly before launch.', 'TestTube', 3),
(4, 'Launch & Support', 'We handle the deployment and provide ongoing support to ensure your success.', 'Rocket', 4);

-- Insert hero section
INSERT INTO `hero_section` (`headline`, `subheadline`, `cta_text`, `secondary_cta_text`) VALUES
('Code at the Speed of Light', 'Professional websites and mobile apps delivered in record time. From landing pages in 48 hours to full-scale applications.', 'Get Started', 'View Our Work');

-- Insert contact information
INSERT INTO `contact_info` (`type`, `label`, `value`, `icon`, `is_primary`, `display_order`) VALUES
('email', 'Email', 'hello@lunaxcode.com', 'Mail', true, 1),
('phone', 'Phone', '+63 912 345 6789', 'Phone', true, 2),
('address', 'Address', 'Metro Manila, Philippines', 'MapPin', false, 3),
('social', 'Facebook', 'https://facebook.com/lunaxcode', 'Facebook', false, 4),
('social', 'Twitter', 'https://twitter.com/lunaxcode', 'Twitter', false, 5),
('social', 'LinkedIn', 'https://linkedin.com/company/lunaxcode', 'Linkedin', false, 6);

-- Insert sample testimonials
INSERT INTO `testimonials` (`client_name`, `client_company`, `client_role`, `testimonial`, `rating`, `project_type`, `display_order`) VALUES
('Maria Santos', 'Santos Digital Marketing', 'CEO', 'Lunaxcode delivered our landing page in exactly 48 hours as promised. The quality exceeded our expectations and our conversion rate increased by 40%.', 5, 'landing_page', 1),
('Juan dela Cruz', 'Cruz Restaurant Chain', 'Owner', 'The mobile app they built for our restaurant helped us increase online orders by 300%. Outstanding work and great support.', 5, 'mobile_app', 2),
('Ana Reyes', 'Reyes Consulting', 'Founder', 'Professional website with CMS delivered on time. The team was responsive and understood our requirements perfectly.', 5, 'basic_website', 3);

-- Insert FAQs
INSERT INTO `faqs` (`question`, `answer`, `category`, `display_order`) VALUES
('How fast can you really deliver a landing page?', 'We guarantee delivery of professional landing pages within 48 hours. This includes responsive design, basic SEO optimization, contact forms, and AI chat widget integration.', 'process', 1),
('What is included in the AI chat widget?', 'Our AI chat widget includes automated responses to common questions, lead capture functionality, and basic customer support. It can be customized to match your brand and specific business needs.', 'technical', 2),
('Do you provide ongoing support after launch?', 'Yes, we provide 30 days of free support after launch for all projects. We also offer ongoing maintenance packages for continued support and updates.', 'general', 3),
('Can you work with existing branding and design guidelines?', 'Absolutely. We can work with your existing brand guidelines, colors, fonts, and design preferences to ensure consistency across all your digital assets.', 'general', 4),
('What payment methods do you accept?', 'We accept bank transfers, GCash, PayMaya, and major credit cards. We typically require 50% upfront and 50% upon completion.', 'pricing', 5),
('Do you provide hosting and domain services?', 'While we can recommend hosting providers and help with setup, we focus on development. We can assist with deployment to your preferred hosting platform.', 'technical', 6);