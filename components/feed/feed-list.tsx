import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp } from "lucide-react";
import { useRedditStore } from "@/stores/reddit-store";
import { formatTimeAgo, highlightText } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import FeedListSkeleton from "./feed-list-skeleton";


export default function FeedList() {
    const { getFilteredPosts, searchTerm, isCaseSensitive, loading } = useRedditStore();
    const posts = getFilteredPosts();

    return (
        <ScrollArea className="h-[600px] w-full">
            {loading ? (
                <FeedListSkeleton />
            ) : (
                <div className="space-y-4 p-4 max-w-full">
                    {posts.map((post) => (
                        <Card key={post.id} className="py-4 space-y-4 overflow-hidden" data-testid="list-item">
                            <CardContent className="px-4">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1 min-w-0 break-words">
                                        <span className="font-semibold">
                                            <Link href={post.url} target="_blank" className="hover:underline line-clamp-2">
                                                <div dangerouslySetInnerHTML={{ __html: highlightText(post.title, searchTerm, isCaseSensitive) }} />
                                            </Link>
                                        </span>
                                        <div className="mt-3">
                                            <div className="text-xs text-muted-foreground mb-2">
                                                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                                    {post.domain}
                                                </Badge>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
                                                <p className="flex items-center gap-1">
                                                    <span className="text-amber-500"><ArrowUp size={16} /></span> {new Intl.NumberFormat('de-DE').format(post.ups)}
                                                </p>
                                                <span>{formatTimeAgo(post.created_utc)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {post.thumbnail?.startsWith("http") && (
                                        <div className="flex-shrink-0 order-first sm:order-last">
                                            <div className="bg-muted rounded flex items-center justify-center text-2xl sm:w-[6rem] sm:h-[6rem] w-full aspect-[3/2]">
                                                <img
                                                    src={post.thumbnail}
                                                    alt={post.title}
                                                    width={post.thumbnail_width || 64}
                                                    height={post.thumbnail_height || 64}
                                                    className="object-cover rounded w-full h-full"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </ScrollArea>
    );
}
