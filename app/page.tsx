'use client';

import { getPosts } from './lib/api';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Home() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto py-12 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">Public Blog</h1>
        <p className="text-muted-foreground">Read our latest posts and updates</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: Post) => (
          <Card key={post.id} className="group transition hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold group-hover:text-primary transition">
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {post.body.slice(0, 100)}...
              </p>
              <Link href={`/posts/${post.id}`}>
                <Button size="sm" variant="outline">
                  Read More
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
