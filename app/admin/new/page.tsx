'use client';

import { createPost } from '@/app/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createPost,
    onMutate: () => setLoading(true),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      toast.success('Post created');
      router.push('/admin');
    },
    onError: () => {
      toast.error('Failed to create post');
    },
    onSettled: () => setLoading(false),
  });

  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) {
      toast.error("Title and body can't be empty");
      return;
    }
    mutation.mutate({ title, body });
  };

  return (
    <AdminLayout>
      <div className="max-w-8xl mx-auto">
        <Card className="shadow">
          <CardHeader>
            <h1 className="text-3xl font-semibold">Create New Post</h1>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Title</label>
              <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Body</label>
               <RichTextEditor content={body} onChange={setBody} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Save Post
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AdminLayout>
  );
}
