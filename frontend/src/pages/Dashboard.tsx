import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authService } from '@/services/authService';
import { taskService } from '@/services/taskService';
import { LayoutDashboard, User, CheckSquare, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const currentUser = authService.getCurrentUser();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, completed: 0, inProgress: 0 });
  const [loading, setLoading] = useState(true);

  const handleQuickActionClick = (title: string) => {
    switch (title) {
      case 'Create Task':
        navigate('/dashboard/tasks');
        break;
      case 'Update Profile':
        navigate('/dashboard/profile');
        break;
      case 'View Analytics':
        navigate('/analytics');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const data = await taskService.getTaskStats();
        if (isMounted) {
          setStats(data);
        }
      } catch (error) {
        if (isMounted) {
          setStats({ total: 0, completed: 0, inProgress: 0 });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      description: 'All tasks you have created',
      icon: CheckSquare,
      color: 'from-primary to-primary/60',
    },
    {
      title: 'Completed',
      value: stats.completed,
      description: 'Tasks you have finished',
      icon: TrendingUp,
      color: 'from-success to-success/60',
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      description: 'Tasks still in progress',
      icon: LayoutDashboard,
      color: 'from-accent to-accent/60',
    },
    {
      title: 'Profile Status',
      value: 'Active',
      description: 'Last updated today',
      icon: User,
      color: 'from-warning to-warning/60',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-foreground">
            Welcome back, {currentUser?.name}!
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Here's what's happening with your tasks today.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.title} variants={itemVariants}>
                <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {loading && (stat.title === 'Total Tasks' || stat.title === 'Completed' || stat.title === 'In Progress')
                        ? '...'
                        : stat.value}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">Quick Actions</CardTitle>
              <CardDescription className="text-base">
                Get started with these common tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { icon: CheckSquare, title: 'Create Task', description: 'Add a new task to your list', color: 'from-primary to-accent' },
                  { icon: User, title: 'Update Profile', description: 'Edit your personal information', color: 'from-accent to-primary' },
                  { icon: TrendingUp, title: 'View Analytics', description: 'Track your productivity', color: 'from-primary to-success' }
                ].map((action, i) => {
                  const ActionIcon = action.icon;
                  return (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + (i * 0.1), duration: 0.3 }}
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      onClick={() => handleQuickActionClick(action.title)}
                    >
                      <Card className="border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 transition-all duration-300 cursor-pointer group">
                        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                          <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <ActionIcon className="h-7 w-7 text-white" />
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {action.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
