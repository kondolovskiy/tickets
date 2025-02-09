// Add any client-side test setup here
import '@testing-library/jest-dom';

// Setup window.location for tests
const originalLocation = window.location;

beforeEach(() => {
  delete (window as any).location;
  window.location = {
    ...originalLocation,
    assign: jest.fn(),
  } as any;
});

afterEach(() => {
  window.location = originalLocation;
}); 