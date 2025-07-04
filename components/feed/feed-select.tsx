import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { useRedditStore } from '@/stores/reddit-store';

export default function FeedSelect() {
    const { selectedDomain, setSelectedDomain } = useRedditStore();
    const domains = useRedditStore(state => state.uniqueDomains);
    // Could have been a multi select

    return (
        <Select value={selectedDomain} onValueChange={setSelectedDomain}>
            <SelectTrigger className="w-full sm:w-[180px] cursor-pointer">
                <SelectValue placeholder="All domains" />
            </SelectTrigger>
            <SelectContent >
                <SelectGroup>
                    <SelectLabel>Filter by Domain</SelectLabel>
                    <SelectItem value="all" className="cursor-pointer">All domains</SelectItem>
                    {domains.map((domain) => (
                        <SelectItem key={domain} value={domain} className="cursor-pointer">
                            {domain}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
