import { decodeRedditThumbnailUrl } from "./utils";

export interface RedditPost {
    id: string;
    title: string;
    domain: string;
    created_utc: number;
    ups: number;
    thumbnail: string;
    url: string;
    thumbnail_height?: number;
    thumbnail_width?: number;
}

export async function fetchRedditPosts(): Promise<RedditPost[]> {
    const res = await fetch("https://www.reddit.com/r/worldnews/top.json?limit=20");

    const data = await res.json();
    return data.data.children.map((child: { data: RedditPost }) => {
        const post = child.data;

        return {
            id: post.id,
            title: post.title,
            domain: post.domain,
            created_utc: post.created_utc,
            ups: post.ups,
            thumbnail: decodeRedditThumbnailUrl(post.thumbnail),
            url: post.url,
            thumbnail_height: post.thumbnail_height,
            thumbnail_width: post.thumbnail_width,
        };
    });
}
