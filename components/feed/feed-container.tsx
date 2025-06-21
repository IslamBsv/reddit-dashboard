"use client"

import { RedditPost } from "@/lib/reddit";
import FeedList from "./feed-list";
import { useFeedSearch } from "@/hooks/use-feed-search";
import FeedSearch from "./feed-search";

interface FeedContainerProps {
    posts: RedditPost[];
}

export default function FeedContainer({ posts }: FeedContainerProps) {
    const {
        searchTerm,
        setSearchTerm,
        filteredPosts,
        isCaseSensitive,
        setIsCaseSensitive
    } = useFeedSearch(posts);

    return (
        <div>
            <FeedSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                isCaseSensitive={isCaseSensitive}
                onCaseSensitiveChange={setIsCaseSensitive}
            />
            <h2 className="text-4xl py-5">Top Headlines ({filteredPosts.length})</h2>
            <FeedList
                posts={filteredPosts}
                searchTerm={searchTerm}
                isCaseSensitive={isCaseSensitive}
            />
        </div>
    );
}