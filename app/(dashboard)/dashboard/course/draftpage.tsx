'use client';

import { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, DollarSign, Users } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Commission, Student } from '@/app/(mockAndSeedData)/mockData';

export default function CoursesPage() {
  const [commissions, setCommissions] = useState<(Commission & { students: Student })[]>([]);
  const [stats, setStats] = useState({
    lifetime: 0,
    lifeTime: 0,
    lastMonth: 0,
  });

  useEffect(() => {
    async function fetchData() {
      
    }

    fetchData();
  }, []);

  return (
    <div className="h-full bg-white">
      <div className="border-b px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">NCERT Solutions for Class 12 Chemistry</h1>
          </div>
          <button className="text-gray-600 hover:text-gray-900">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <Tabs defaultValue="commission" className="px-8 py-4">
        <TabsList className="mb-6">
          <TabsTrigger value="commission">Commission</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="chapters">Chapters</TabsTrigger>
          <TabsTrigger value="promotion">Promotion</TabsTrigger>
          <TabsTrigger value="detail">Detail</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="new course">New Course</TabsTrigger>
        </TabsList>

        <TabsContent value="commission" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Life time Courses Commission</p>
                    <p className="text-3xl font-bold mt-2">${stats.lifetime.toFixed(1)}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Life time Received Commission</p>
                    <p className="text-3xl font-bold mt-2">${stats.lifeTime.toFixed(1)}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Last Month Commission</p>
                    <p className="text-3xl font-bold mt-2">${stats.lastMonth.toFixed(1)}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Commission</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commissions.map((commission) => (
                    <TableRow key={commission.id}>
                      <TableCell className="font-medium">{commission.order_id}</TableCell>
                      <TableCell>{commission.students?.name}</TableCell>
                      <TableCell>{commission.type}</TableCell>
                      <TableCell>{new Date(commission.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                      <TableCell>
                        <Badge
                          variant={commission.status === 'Received' ? 'default' : 'secondary'}
                          className={
                            commission.status === 'Received'
                              ? 'bg-green-100 text-green-800 hover:bg-green-100'
                              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                          }
                        >
                          {commission.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{Number(commission.amount).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex items-center justify-center gap-2 mt-6 pb-4">
                <button className="px-3 py-1 border rounded hover:bg-gray-50">
                  &lt;
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">
                  &gt;
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600">Course reviews will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600">Customer information will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chapters">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600">Course chapters will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotion">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600">Promotional content will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detail">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600">Course details will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600">Course settings will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new course">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600">New course details appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
