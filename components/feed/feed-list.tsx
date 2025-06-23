import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp } from "lucide-react";
import { useRedditStore } from "@/stores/reddit-store";
import { formatTimeAgo, highlightText } from "@/lib/utils";


export default function FeedList() {
    const { getFilteredPosts, searchTerm, isCaseSensitive } = useRedditStore();
    const posts = getFilteredPosts();

    return (
        <div className="h-[40rem] overflow-y-auto pr-4 space-y-4">
            {posts.map((post) => (
                <Card key={post.id} className="py-4">
                    <CardContent className="flex gap-4 items-center">
                        <div>
                            {post.thumbnail?.startsWith("http") ? (
                                <img
                                    src={post.thumbnail}
                                    alt={post.title}
                                    width={post.thumbnail_width || 64}
                                    height={post.thumbnail_height || 64}
                                    className="object-cover rounded w-16 h-16"
                                    loading="lazy"
                                />

                            ) : (
                                <div className="w-16 h-16 bg-muted rounded flex items-center justify-center text-2xl">
                                    📰
                                </div>
                            )}
                        </div>
                        <div>
                            <span className="font-semibold">
                                <Link href={post.url} target="_blank" className="hover:underline">
                                    <div dangerouslySetInnerHTML={{ __html: highlightText(post.title, searchTerm, isCaseSensitive) }} />
                                </Link>
                            </span>
                            <div className="mt-2">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                    <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                        {post.domain}
                                    </Badge>

                                    <span className="flex items-center gap-1">
                                        <ArrowUp size={16} /> {new Intl.NumberFormat('de-DE').format(post.ups)}
                                    </span>
                                    <span>{formatTimeAgo(post.created_utc)}</span>


                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>
            ))}
        </div >
    );
}
