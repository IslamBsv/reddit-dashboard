import { expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import FeedList from '../components/feed/feed-list';
import { formatTimeAgo } from "../lib/utils";

vi.mock('../stores/reddit-store', () => ({
  useRedditStore: () => ({
    getFilteredPosts: () => [
      {
        id: '1',
        title: 'Test Post No Thumbnail',
        domain: 'test.com',
        created_utc: 1710000000,
        ups: 123,
        thumbnail: '',
        url: 'https://test.com',
      },
      {
        id: '2',
        title: 'Test Post With Thumbnail',
        domain: 'test.com',
        created_utc: 1510000000,
        ups: 535,
        thumbnail: 'https://test.com/thumbnail.jpg',
        url: 'https://test.com',
      },
    ],
    searchTerm: '',
    isCaseSensitive: false,
    loading: false,
  }),
}));

test('renders post title from store', () => {
  const { getByText } = render(<FeedList />);
  expect(getByText('Test Post No Thumbnail')).toBeDefined();
  expect(getByText('Test Post With Thumbnail')).toBeDefined();
});

test('renders upvotes and domain for each post', () => {
  const { getAllByText } = render(<FeedList />);

  expect(getAllByText('test.com')).toHaveLength(2);
  expect(getAllByText('123')[0]).toBeInTheDocument();
  expect(getAllByText('535')[0]).toBeInTheDocument();
});

test('renders post titles as links with correct href and target', () => {
  const { getAllByRole } = render(<FeedList />);
  const links = getAllByRole('link', { name: /test post/i });

  expect(links).toHaveLength(2);
  links.forEach((link) => {
    expect(link).toHaveAttribute('href', 'https://test.com');
    expect(link).toHaveAttribute('target', '_blank');
  });
});

test('renders thumbnails only for posts with valid thumbnail URLs', () => {
  const { queryAllByRole, getAllByTestId } = render(<FeedList />);

  const images = queryAllByRole('img');
  expect(images).toHaveLength(1);

  const postCards = getAllByTestId('list-item');
  expect(postCards).toHaveLength(2);
  expect(postCards.length - images.length).toBe(1);
});

test('renders formatted time for each post', () => {
  const { getByText } = render(<FeedList />);
  expect(getByText(formatTimeAgo(1710000000))).toBeInTheDocument();
  expect(getByText(formatTimeAgo(1510000000))).toBeInTheDocument();
});
