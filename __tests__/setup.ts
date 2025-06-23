import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Optional: suppress React 18's act warnings
vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
