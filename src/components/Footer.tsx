import React, { useState } from 'react';
import { Dumbbell, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Programs', href: '#programs' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'Personal Training',
    'Group Classes',
    'Nutrition Coaching',
    'Weight Training',
    'Cardio Fitness',
    '24/7 Access'
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' }
  ];
  const [email, setEmail] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      alert('Please enter your email address');
      return;
    }
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    setIsSubscribing(true);
    
    // Create Gmail compose URL for subscription
    const subject = encodeURIComponent('Newsletter Subscription Request');
    const body = encodeURIComponent(`
Hello FitZone Team,

I would like to subscribe to your newsletter.

Email: ${email}

Please add me to your mailing list for fitness tips, class schedules, and exclusive offers.

Thank you!
    `);
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@fitzone.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
    
    setTimeout(() => {
      setIsSubscribing(false);
      setSubscribeSuccess(true);
      setEmail('');
      
      setTimeout(() => {
        setSubscribeSuccess(false);
      }, 3000);
    }, 1000);
  };

  const handleSocialClick = (platform: string) => {
    alert(`We will be live soon on ${platform}! Stay tuned for updates.`);
  };

  const scrollToSection = (href: string) => {
    const currentPath = window.location.pathname;
    
    if (currentPath === '/') {
      // We're on home page, scroll directly
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page first, then scroll after page loads
      window.location.href = `/#${href.substring(1)}`;
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Dumbbell className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold">FitZone</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transform your body and mind with our comprehensive fitness programs, expert trainers, and supportive community.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSocialClick(social.name);
                  }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">Model Town Extension</p>
                  <p className="text-gray-400">Near GT Road</p>
                  <p className="text-gray-400">Jalandhar, Punjab 144003</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-gray-400">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-gray-400">info@fitzone.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 py-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for fitness tips, class schedules, and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
              <button 
                type="submit"
                disabled={isSubscribing || subscribeSuccess}
                className={`px-6 py-3 rounded-r-lg transition-colors duration-200 ${
                  subscribeSuccess 
                    ? 'bg-green-500 text-white' 
                    : isSubscribing 
                      ? 'bg-orange-400 cursor-not-allowed' 
                      : 'bg-orange-500 hover:bg-orange-600'
                } text-white`}
              >
                {subscribeSuccess ? 'Subscribed!' : isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {subscribeSuccess && (
              <p className="mt-2 text-sm text-green-400">Thank you for subscribing! Check your email.</p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 FitZone. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;