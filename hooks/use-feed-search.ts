"use client"

import { useMemo, useState } from "react";
import { RedditPost } from "@/lib/reddit";

export function useFeedSearch(posts: RedditPost[]) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isCaseSensitive, setIsCaseSensitive] = useState(false);

    const filteredPosts = useMemo(() => {
        if (!searchTerm.trim()) {
            return posts;
        }

        return posts.filter((post) => {
            if (isCaseSensitive) {
                return post.title.includes(searchTerm);
            } else {
                return post.title.toLowerCase().includes(searchTerm.toLowerCase());
            }
        });
    }, [posts, searchTerm, isCaseSensitive]);

    return {
        searchTerm,
        setSearchTerm,
        filteredPosts,
        isCaseSensitive,
        setIsCaseSensitive
    };
}