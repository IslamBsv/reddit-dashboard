import { create } from 'zustand';
import { RedditPost, fetchRedditPosts } from '@/lib/reddit';

interface RedditStore {
    posts: RedditPost[];
    uniqueDomains: string[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    isCaseSensitive: boolean;
    selectedDomain: string;

    fetchPosts: () => Promise<void>;
    setSearchTerm: (term: string) => void;
    setIsCaseSensitive: (sensitive: boolean) => void;
    setSelectedDomain: (domain: string) => void;
    getFilteredPosts: () => RedditPost[];
}

export const useRedditStore = create<RedditStore>((set, get) => ({
    posts: [],
    uniqueDomains: [],
    loading: false,
    error: null,
    searchTerm: '',
    isCaseSensitive: false,
    selectedDomain: 'all',

    fetchPosts: async () => {
        set({ loading: true, error: null });
        try {
            const posts = await fetchRedditPosts();
            
            const uniqueDomains = [...new Set(posts.map(post => post.domain))].sort();
            set({ posts, uniqueDomains, loading: false }); 
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch posts',
                loading: false
            });
        }
    },

    setSearchTerm: (term: string) => set({ searchTerm: term }),
    setIsCaseSensitive: (sensitive: boolean) => set({ isCaseSensitive: sensitive }),
    setSelectedDomain: (domain: string) => set({ selectedDomain: domain }),

    getFilteredPosts: () => {
        const { posts, searchTerm, isCaseSensitive, selectedDomain } = get();

        let filtered = posts;

        if (selectedDomain && selectedDomain !== 'all') {
            filtered = filtered.filter(post => post.domain === selectedDomain);
        }

        if (searchTerm.trim()) {
            filtered = filtered.filter((post) => {
                if (isCaseSensitive) {
                    return post.title.includes(searchTerm);
                } else {
                    return post.title.toLowerCase().includes(searchTerm.toLowerCase());
                }
            });
        }

        return filtered;
    }
}));