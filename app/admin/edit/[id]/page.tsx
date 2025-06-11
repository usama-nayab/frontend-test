'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { getPost, updatePost } from '@/lib/api';
import { getPost , updatePost } from '@/app/lib/api';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';
import { toast } from 'sonner';

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(Number(id)),
  });

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      toast.success('Post updated');
      router.push('/admin');
    },
    onError: () => {
      toast.error('Failed to update post');
    },
    onSettled: () => setLoading(false),
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
      <div className="max-w-8xl mx-auto">
        <Card>
          <CardHeader>
            <h2 className="text-3xl font-semibold">Edit Post</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
              <label className="block mb-1 font-medium">Content</label>
              <RichTextEditor content={post.body} onChange={setBody} />
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button onClick={() => updateMutation.mutate({ id: Number(id), title, body })}>
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Save Changes
            </Button>
          
          </CardFooter>
        </Card>
      </div>
    </AdminLayout>
  );
}
