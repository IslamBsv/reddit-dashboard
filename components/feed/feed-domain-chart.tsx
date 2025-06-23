import { useRedditStore } from "@/stores/reddit-store";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function FeedDomainChart() {
    const posts = useRedditStore((state) => state.posts);

    const { labels, data } = useMemo(() => {
        const counts: Record<string, number> = {};
        posts.forEach(post => {
            counts[post.domain] = (counts[post.domain] || 0) + 1;
        });
        const labels = Object.keys(counts);
        const data = Object.values(counts);
        return { labels, data };
    }, [posts]);

    if (!labels.length) return null;

    return (
        <div className="w-full h-72 my-8">
            <Bar
                data={{
                    labels,
                    datasets: [
                        {
                            label: "Number of Posts",
                            data,
                            backgroundColor: "#3b82f6",
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false, 
                    plugins: {
                        legend: { display: false },
                        title: { display: true, text: "Posts by Domain" },
                    },
                    scales: {
                        y: { beginAtZero: true, ticks: { precision: 0 } },
                    },
                }}
            />
        </div>
    );
}