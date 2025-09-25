/**
 * API Configuration Helper
 * Manages API endpoints for both local and external services
 */

// Get the configured API base URL from environment variables
export const getApiBaseUrl = () => {
  const externalApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  // If external API is configured, use it for admin operations
  if (externalApiUrl) {
    return externalApiUrl;
  }
  
  // Fallback to local API routes
  return '/api/cms';
};

// Check if we're using external API
export const isUsingExternalApi = () => {
  return !!process.env.NEXT_PUBLIC_API_BASE_URL;
};

// Get the full endpoint URL for a given path
export const getApiEndpoint = (path: string) => {
  const baseUrl = getApiBaseUrl();
  
  // Handle both external API format (/api/v1/path) and local format (/api/cms/path)
  if (baseUrl.includes('/api/v1')) {
    // External API - path is appended directly
    return `${baseUrl}/${path}`;
  } else {
    // Local API - path is appended to /api/cms
    return `${baseUrl}/${path}`;
  }
};

// API client with authentication headers
export const createApiClient = () => {
  const baseUrl = getApiBaseUrl();
  
  return {
    async get(endpoint: string) {
      const url = getApiEndpoint(endpoint);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    },
    
    async post(endpoint: string, data: any) {
      const url = getApiEndpoint(endpoint);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    },
    
    async put(endpoint: string, data: any) {
      const url = getApiEndpoint(endpoint);
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    },
    
    async delete(endpoint: string) {
      const url = getApiEndpoint(endpoint);
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    },
  };
};

// Helper to test API connectivity
export const testApiConnection = async () => {
  try {
    const client = createApiClient();
    
    // Try to fetch a simple endpoint to test connectivity
    const result = await client.get('onboarding?limit=1');
    
    console.log('✅ API Connection Test Successful:', {
      baseUrl: getApiBaseUrl(),
      isExternal: isUsingExternalApi(),
      responseReceived: !!result,
    });
    
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ API Connection Test Failed:', {
      baseUrl: getApiBaseUrl(),
      isExternal: isUsingExternalApi(),
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};
