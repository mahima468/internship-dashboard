import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { taskService, Task } from '@/services/taskService';

interface StatusStats {
  label: string;
  key: 'pending' | 'in-progress' | 'completed';
  value: number;
  color: string;
}

interface DayPoint {
  label: string;
  value: number;
}

const Analytics = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await taskService.getTasks();
        setTasks(data);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const statusStats: StatusStats[] = useMemo(() => {
    const base: Record<'pending' | 'in-progress' | 'completed', number> = {
      pending: 0,
      'in-progress': 0,
      completed: 0,
    };

    for (const task of tasks) {
      if (task.status in base) {
        base[task.status as keyof typeof base] += 1;
      }
    }

    return [
      { label: 'To Do', key: 'pending', value: base.pending, color: 'bg-secondary' },
      { label: 'In Progress', key: 'in-progress', value: base['in-progress'], color: 'bg-accent' },
      { label: 'Completed', key: 'completed', value: base.completed, color: 'bg-success' },
    ];
  }, [tasks]);

  const tasksByDay: DayPoint[] = useMemo(() => {
    const days: DayPoint[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const label = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      days.push({ label, value: 0 });
    }

    const start = new Date();
    start.setDate(start.getDate() - 6);
    start.setHours(0, 0, 0, 0);

    for (const task of tasks) {
      const created = new Date(task.createdAt);
      if (created < start) continue;

      const label = created.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      const point = days.find((d) => d.label === label);
      if (point) {
        point.value += 1;
      }
    }

    return days;
  }, [tasks]);

  const maxStatus = Math.max(...statusStats.map((s) => s.value), 1);
  const maxDay = Math.max(...tasksByDay.map((d) => d.value), 1);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-foreground">Task Analytics</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Insights and trends based on your tasks.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid gap-6 md:grid-cols-2"
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Tasks by Status</CardTitle>
              <CardDescription className="text-base">
                Current distribution of your tasks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground">Loading stats...</p>
              ) : (
                <div className="flex items-end gap-4 h-40">
                  {statusStats.map((s) => (
                    <div key={s.key} className="flex-1 flex flex-col items-center gap-2">
                      <div className="flex flex-col items-center text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground text-sm">{s.value}</span>
                        <span>{s.label}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-28 flex items-end overflow-hidden">
                        <div
                          className={`${s.color} w-full rounded-t-full transition-all duration-500`}
                          style={{ height: `${(s.value / maxStatus) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Tasks Created (Last 7 Days)</CardTitle>
              <CardDescription className="text-base">
                How many tasks you have created recently.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground">Loading activity...</p>
              ) : (
                <div className="flex items-end gap-3 h-40">
                  {tasksByDay.map((d) => (
                    <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs text-muted-foreground">{d.label}</span>
                      <div className="w-full bg-muted rounded-full h-24 flex items-end overflow-hidden">
                        <div
                          className="bg-primary w-full rounded-t-full transition-all duration-500"
                          style={{ height: `${(d.value / maxDay) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{d.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
