import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 30, // 30 seconds
			gcTime: 1000 * 60 * 10, // 10 minutes
		},
	},
});