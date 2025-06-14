
// Validation functions
export const isValidArray = (data: any): data is any[] => {
  return Array.isArray(data) && data.length >= 0;
};

export function safeArrayCast<T>(data: any): T[] {
  if (isValidArray(data)) {
    return data.filter(item => item && typeof item === 'object' && 'id' in item);
  }
  return [];
}

// Cache configuration
export const getCacheConfig = () => ({
  staleTime: 2 * 60 * 1000, // 2 minutes
  gcTime: 5 * 60 * 1000, // 5 minutes
  retry: 1,
  refetchOnWindowFocus: false,
});
