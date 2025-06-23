import { Input } from "@/components/ui/input";
import { CaseLower, CaseSensitive, Search } from "lucide-react";
import { Button } from "../ui/button";
import clsx from "clsx";
import { useRedditStore } from "@/stores/reddit-store";


export default function FeedSearch() {
    const { searchTerm, setSearchTerm, isCaseSensitive, setIsCaseSensitive } = useRedditStore();
    // Could use debounce for search on larger lists

    return (
        <div className="flex-1 w-full">
            <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    type="text"
                    placeholder="Search posts by headline..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-12"
                />
                <Button
                    variant="ghost" size="sm"
                    onClick={() => setIsCaseSensitive(!isCaseSensitive)}
                    className={clsx(
                        'cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 p-1 h-fit',
                        isCaseSensitive && 'bg-blue-500 text-white hover:bg-blue-500 dark:hover:bg-blue-500'
                    )}
                >
                    {isCaseSensitive ? <CaseSensitive /> : <CaseLower />}
                </Button>
            </div>
        </div>
    );
}