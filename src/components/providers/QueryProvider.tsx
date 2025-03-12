import React, {PropsWithChildren} from 'react'
import { QueryClient, defaultShouldDehydrateQuery, isServer, QueryClientProvider } from '@tanstack/react-query';

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

const QueryProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
export default QueryProvider
