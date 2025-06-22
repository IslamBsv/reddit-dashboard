import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { useRedditStore } from '@/stores/reddit-store';

export default function FeedSelect() {
    const { selectedDomain, setSelectedDomain, getUniqueDomains } = useRedditStore();
    const domains = getUniqueDomains();

    return (
        <Select value={selectedDomain} onValueChange={setSelectedDomain}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All domains" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Filter by Domain</SelectLabel>
                    <SelectItem value="all">All domains</SelectItem>
                    {domains.map((domain) => (
                        <SelectItem key={domain} value={domain}>
                            {domain}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
