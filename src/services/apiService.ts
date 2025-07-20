// API Service for backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  // Set authentication token
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  // Remove authentication token
  removeToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  // Get headers with authentication
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    const response = await this.request<{
      message: string;
      token: string;
      user: any;
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request<{
      message: string;
      token: string;
      user: any;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.removeToken();
    }
  }

  async getCurrentUser() {
    return this.request<{ user: any }>('/auth/me');
  }

  // Cart methods
  async getCart() {
    return this.request<{
      items: any[];
      totalItems: number;
      totalPrice: number;
      formattedTotal: string;
    }>('/cart');
  }

  async addToCart(item: {
    id: string;
    name: string;
    price: number;
    type: string;
    image?: string;
    duration?: string;
    level?: string;
    quantity?: number;
  }) {
    return this.request('/cart/add', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }

  async updateCartItem(itemId: string, quantity: number) {
    return this.request(`/cart/update/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(itemId: string) {
    return this.request(`/cart/remove/${itemId}`, {
      method: 'DELETE',
    });
  }

  async clearCart() {
    return this.request('/cart/clear', {
      method: 'DELETE',
    });
  }

  // Order methods
  async createOrder(orderData: {
    items: any[];
    billing: any;
    payment: any;
  }) {
    return this.request<{
      message: string;
      order: any;
    }>('/orders/create', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getMyOrders(page = 1, limit = 10) {
    return this.request<{
      orders: any[];
      pagination: any;
    }>(`/orders/my-orders?page=${page}&limit=${limit}`);
  }

  async getOrder(orderId: string) {
    return this.request<{ order: any }>(`/orders/${orderId}`);
  }

  async cancelOrder(orderId: string, reason?: string) {
    return this.request(`/orders/${orderId}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  // User profile methods
  async updateProfile(profileData: any) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(passwordData: {
    currentPassword: string;
    newPassword: string;
  }) {
    return this.request('/users/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
  }

  // Programs methods
  async getPrograms() {
    return this.request<{ programs: any[] }>('/programs');
  }

  async getProgram(programId: string) {
    return this.request<{ program: any }>(`/programs/${programId}`);
  }

  // Contact method
  async submitContact(contactData: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  // Health check
  async healthCheck() {
    return this.request<{
      status: string;
      timestamp: string;
      uptime: number;
    }>('/health');
  }
}

export const apiService = new ApiService();
export default apiService;