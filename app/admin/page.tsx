'use client';

import { getPosts, deletePost } from '../lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { Loader2, SquarePen, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPage() {
  const queryClient = useQueryClient();
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      toast.success('Post deleted');
    },
    onError: () => {
      toast.error('Failed to delete post');
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-8xl mx-auto space-y-6 h-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">Posts</h1>
        </div>

        <div>
        {posts.map((post: any) => (
          <Card key={post.id} className="shadow hover:shadow-lg h-full transition my-4">
            <CardHeader>
              <h2 className="text-lg font-semibold">{post.title}</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 line-clamp-3">{post.body}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Link href={`/admin/edit/${post.id}`}>
                <Button variant="outline" size="sm"><SquarePen className="h-4 w-4 mr-1" /> Edit</Button>
              </Link>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" onClick={() => setSelectedPost(post.id)}>
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        if (selectedPost) deleteMutation.mutate(selectedPost);
                      }}
                    >
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
        </div>
      </div>
    </AdminLayout>
  );
}
