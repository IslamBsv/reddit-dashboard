import FeedContainer from "@/components/feed/feed-container";
import { Header } from "@/components/layout/header";
import { fetchRedditPosts } from "@/lib/reddit";

export default async function Home() {
  const posts = await fetchRedditPosts();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FeedContainer posts={posts} />
      </main >
    </div >
  );
}
