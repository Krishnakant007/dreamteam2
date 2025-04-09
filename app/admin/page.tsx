// app/admin/page.tsx
"use client";

import { useState } from 'react';
import { Button } from '../../components/ui/button';


export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const updateMatches = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/update-matches');
      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Failed to update matches');
      console.log(error,'😡😡😡😡😡')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Update Cricket Matches</h2>
        <Button 
          onClick={updateMatches}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Matches Now'}
        </Button>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </div>
    </div>
  );
}