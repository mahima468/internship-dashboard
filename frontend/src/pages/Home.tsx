import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, LayoutDashboard, Lock, Zap } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Lock,
      title: 'Secure Authentication',
      description: 'Industry-standard JWT authentication with secure login and signup flows',
    },
    {
      icon: LayoutDashboard,
      title: 'Modern Dashboard',
      description: 'Clean, intuitive interface with responsive design for all devices',
    },
    {
      icon: CheckCircle,
      title: 'Task Management',
      description: 'Complete CRUD operations with search, filter, and organization features',
    },
    {
      icon: Zap,
      title: 'Fast Performance',
      description: 'Built with React and optimized for speed and user experience',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-bold text-foreground leading-tight">
            Modern Task Management
            <span className="block text-primary mt-2">Made Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            A powerful yet intuitive dashboard for managing your tasks, projects, and productivity.
            Built with modern technologies for the best user experience.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button size="lg" asChild>
              <Link to="/signup">
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground text-lg">
            Powerful features to help you stay organized and productive
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Join thousands of users who are already managing their tasks more efficiently.
              Create your free account today.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>© 2025 Dashboard App. Built for Frontend Developer Internship Assignment.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
