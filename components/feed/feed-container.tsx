"use client"

import FeedList from "./feed-list";
import FeedSearch from "./feed-search";
import FeedSelect from "./feed-select";
import { useRedditStore } from "@/stores/reddit-store";
import { useEffect } from "react";

export default function FeedContainer() {
    const {
        loading,
        error,
        fetchPosts,
        getFilteredPosts
    } = useRedditStore();

    const filteredPosts = getFilteredPosts();

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    if (loading) {
        return <div className="text-center py-8">Loading posts...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    }

    return (
        <div>
            <div className="flex gap-2 items-center w-full">
                <FeedSearch />
                <FeedSelect />
            </div>
            <h2 className="text-4xl pt-5">Top Headlines</h2>
            <p className="text-muted-foreground mb-4">Number of posts: {filteredPosts.length}</p>
            <FeedList />
        </div>
    );
}