import { RedditPost } from "@/lib/reddit";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

interface FeedListProps {
    posts: RedditPost[];
    searchTerm: string;
    isCaseSensitive: boolean;
}


export default function FeedList({ posts, searchTerm, isCaseSensitive }: FeedListProps) {
    const formatTimeAgo = (utc: number) => {
        const date = new Date(utc * 1000);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

        if (diffInSeconds < 60) {
            return rtf.format(-diffInSeconds, 'second');
        } else if (diffInSeconds < 3600) {
            return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
        } else if (diffInSeconds < 86400) {
            return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
        } else {
            return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
        }
    };

    const highlightText = (text: string, highlight: string, caseSensitive: boolean) => {
        if (!highlight.trim()) {
            return text;
        }

        const regexFlags = caseSensitive ? 'g' : 'gi';
        const regex = new RegExp(`(${escapeRegExp(highlight)})`, regexFlags);
        return text.replace(regex, '<mark>$1</mark>');
    };

    const escapeRegExp = (string: string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    return (
        <div className="h-[40rem] overflow-y-scroll pr-4 space-y-4">
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
