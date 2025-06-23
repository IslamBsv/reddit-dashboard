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
import { useTheme } from "next-themes";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function FeedDomainChart() {
    const { theme } = useTheme();
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

    const isDark = theme === 'dark';

    const redditOrange = '#FF4500';
    const lightText = '#222';
    const darkText = '#eee';
    const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: false },
        },
        scales: {
            x: {
                grid: { display: true, color: gridColor },
                ticks: { color: isDark ? darkText : lightText },
            },
            y: {
                beginAtZero: true,
                grid: { display: true, color: gridColor },
                ticks: { color: isDark ? darkText : lightText, precision: 0 },
                suggestedMax: Math.max(...data) * 1.15 
            },
        },
        elements: {
            bar: {
                borderRadius: 6,
            },
        },
    };

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Number of Posts',
                data,
                backgroundColor: redditOrange,
                borderRadius: 6,
            },
        ],
    };

    return (
        <div className="w-full h-72 my-8 rounded-xl mt-8">
            <h2 className="text-2xl font-bold mb-4">
                Posts by Domain
            </h2>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}