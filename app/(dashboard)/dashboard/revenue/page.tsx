'use client';

import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';


export default function RevenuePage() {
  const [revenue, setRevenue] = useState({
    total: 0,
    received: 0,
    pending: 0,
  });

  useEffect(() => {
    async function fetchRevenue() {
    
    }

    fetchRevenue();
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Revenue</h1>
        <p className="text-gray-600 mt-1">Track your earnings and financial performance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${revenue.total.toFixed(2)}</p>
            <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-green-600" />
              All time earnings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Received
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${revenue.received.toFixed(2)}</p>
            <p className="text-sm text-gray-600 mt-1">Successfully received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-orange-600" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${revenue.pending.toFixed(2)}</p>
            <p className="text-sm text-gray-600 mt-1">Awaiting payment</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Revenue Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Detailed revenue analytics will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
