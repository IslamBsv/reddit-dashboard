import { Input } from "@/components/ui/input";
import { CaseLower, CaseSensitive, Search } from "lucide-react";
import { Button } from "../ui/button";
import clsx from "clsx";

interface FeedSearchProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    isCaseSensitive: boolean;
    onCaseSensitiveChange: (checked: boolean) => void;
    placeholder?: string;
}

export default function FeedSearch({
    searchTerm,
    onSearchChange,
    isCaseSensitive,
    onCaseSensitiveChange,
    placeholder = "Search posts by headline..."
}: FeedSearchProps) {
    return (
        <div className="mb-4">
            <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 pr-12"
                />
                <Button
                    variant="ghost" size="sm"
                    onClick={() => onCaseSensitiveChange(!isCaseSensitive)}
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