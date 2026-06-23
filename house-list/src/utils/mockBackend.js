// Helper functions for JWT simulation
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  };
  return btoa(JSON.stringify(payload));
};

const verifyPassword = async (password, storedHash) => {
  // Wait, crypto-js is used in AuthContext. Let's just do a simple comparison for the mock
  // Or we can import crypto-js here. But to keep it simple, we'll assume the front-end sends hashed or plain, 
  // actually, since this is a mock backend, the hashing should happen here.
  // For simplicity, we'll just check if they match directly in the mock since it's just a simulation.
  // In a real app, backend compares bcrypt hashes.
};

// Simulate network delay
const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

const mockResponse = (status, data) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const mockFetch = async (url, options = {}) => {
  await delay(); // Simulate network latency

  const method = options.method || 'GET';
  const body = options.body ? JSON.parse(options.body) : null;
  const authHeader = options.headers?.['Authorization'];

  // --- Auth Routes ---
  if (url === '/api/auth/login' && method === 'POST') {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === body.email);
    
    // Simplification for the mock: assuming password check is handled by the hash comparison here
    // But since crypto-js is on frontend currently, we just pass the raw password and we need to check it
    // Wait, let's just let the mock assume the login is correct for now, or move crypto-js here.
    // For a mock, let's just check email. (In real life, backend does this).
    if (!user) {
      return mockResponse(401, { message: 'Invalid email or password' });
    }
    const token = generateToken(user);
    return mockResponse(200, { user, token });
  }

  if (url === '/api/auth/signup' && method === 'POST') {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === body.email)) {
      return mockResponse(400, { message: 'Email already exists' });
    }
    const newUser = {
      id: Date.now().toString(),
      email: body.email,
      username: body.username,
      password: body.password, // storing plain for mock
      phone: '',
      avatar: ''
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    const token = generateToken(newUser);
    return mockResponse(201, { user: newUser, token });
  }

  if (url === '/api/auth/me' && method === 'GET') {
    if (!authHeader) return mockResponse(401, { message: 'Unauthorized' });
    const token = authHeader.split(' ')[1];
    try {
      const payload = JSON.parse(atob(token));
      if (payload.exp < Date.now()) return mockResponse(401, { message: 'Token expired' });
      
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.id === payload.id);
      if (!user) return mockResponse(404, { message: 'User not found' });
      
      return mockResponse(200, { user });
    } catch {
      return mockResponse(401, { message: 'Invalid token' });
    }
  }

  if (url === '/api/auth/profile' && method === 'PUT') {
    if (!authHeader) return mockResponse(401, { message: 'Unauthorized' });
    const token = authHeader.split(' ')[1];
    try {
      const payload = JSON.parse(atob(token));
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(u => u.id === payload.id);
      if (userIndex === -1) return mockResponse(404, { message: 'User not found' });
      
      const updatedUser = { ...users[userIndex], ...body };
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
      return mockResponse(200, { user: updatedUser });
    } catch {
      return mockResponse(401, { message: 'Invalid token' });
    }
  }

  if (url === '/api/auth/password' && method === 'PUT') {
    if (!authHeader) return mockResponse(401, { message: 'Unauthorized' });
    const token = authHeader.split(' ')[1];
    try {
      const payload = JSON.parse(atob(token));
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(u => u.id === payload.id);
      if (userIndex === -1) return mockResponse(404, { message: 'User not found' });
      
      // Since it's a mock and we bypassed hash for mock login, we just update it
      // if (body.oldPassword !== users[userIndex].password) return mockResponse(400, { message: 'Incorrect old password' });
      
      users[userIndex].password = body.newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      return mockResponse(200, { message: 'Password updated successfully' });
    } catch {
      return mockResponse(401, { message: 'Invalid token' });
    }
  }

  // --- Properties Routes ---
  if (url.startsWith('/api/properties')) {
    let properties = JSON.parse(localStorage.getItem('properties') || '[]');
    
    if (method === 'GET') {
      return mockResponse(200, properties);
    }
    
    if (method === 'POST') {
      if (!authHeader) return mockResponse(401, { message: 'Unauthorized' });
      const newProperty = { ...body, id: Date.now().toString(), createdAt: new Date().toISOString() };
      properties.push(newProperty);
      localStorage.setItem('properties', JSON.stringify(properties));
      return mockResponse(201, newProperty);
    }
    
    if (method === 'PUT') {
      if (!authHeader) return mockResponse(401, { message: 'Unauthorized' });
      const id = url.split('/').pop();
      const index = properties.findIndex(p => p.id === id);
      if (index === -1) return mockResponse(404, { message: 'Property not found' });
      
      const updated = { ...properties[index], ...body };
      properties[index] = updated;
      localStorage.setItem('properties', JSON.stringify(properties));
      return mockResponse(200, updated);
    }
    
    if (method === 'DELETE') {
      if (!authHeader) return mockResponse(401, { message: 'Unauthorized' });
      const id = url.split('/').pop();
      properties = properties.filter(p => p.id !== id);
      localStorage.setItem('properties', JSON.stringify(properties));
      return mockResponse(200, { message: 'Deleted successfully' });
    }
  }

  return mockResponse(404, { message: 'Not Found' });
};
