import { CheckCircle, Users, Zap, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Listify</h1>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto">
            Connecting businesses with customers through a trusted,
            comprehensive directory platform
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
                At Listify, we believe that every business deserves to be
                discovered. Our mission is to create a vibrant marketplace where
                businesses can showcase their services and customers can find
                exactly what they're looking for.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We're committed to building a platform that's easy to use,
                trustworthy, and beneficial for both business owners and
                customers alike.
              </p>
            </div>
            <div className="bg-muted rounded-lg   flex items-center justify-center">
              <div className="text-center">
                {/* <div className="text-6xl mb-4"> */}
                  <img
                    src="https://i.postimg.cc/k4WR27q4/wrgfj.png"
                    alt="Business Club Hero"
                    className="object-contain h-full w-full"
                  />
            
           
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CheckCircle,
                title: "Trust",
                description:
                  "We build trust through transparency and reliability",
              },
              {
                icon: Users,
                title: "Community",
                description: "We foster a supportive community of businesses",
              },
              {
                icon: Zap,
                title: "Innovation",
                description: "We continuously improve our platform",
              },
              {
                icon: Globe,
                title: "Accessibility",
                description: "We make business discovery easy for everyone",
              },
            ].map((value, idx) => (
              <div key={idx} className="card-base p-6 text-center">
                <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
              <p className="text-muted-foreground">Businesses Listed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">
                50,000+
              </div>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <p className="text-muted-foreground">Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            We're a passionate team of professionals dedicated to making Listify
            the best business directory platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "Founder & CEO" },
              { name: "Mike Chen", role: "CTO" },
              { name: "Emily Rodriguez", role: "Head of Operations" },
            ].map((member, idx) => (
              <div key={idx} className="card-base p-6 text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            Whether you're a business looking to grow or a customer searching
            for services, Listify is here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/add-listing"
              className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              List Your Business
            </a>
            <a
              href="/listings"
              className="px-8 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors"
            >
              Browse Businesses
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
