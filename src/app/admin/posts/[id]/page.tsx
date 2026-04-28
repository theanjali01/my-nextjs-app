import { notFound } from "next/navigation";
import { getDbPostById } from "@/lib/db";
import PostEditor from "@/components/PostEditor";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getDbPostById(Number(id));
  if (!post) notFound();

  return (
    <PostEditor
      mode="edit"
      postId={post.id}
      initial={{
        title: post.title,
        slug: post.slug,
        description: post.description,
        content: post.content,
        tags: post.tags.join(", "),
        published: post.published,
      }}
    />
  );
}
