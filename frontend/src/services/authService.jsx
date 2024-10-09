const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const user = await response.json();
        return user;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      throw error;
    }
  };
  
  const logout = async () => {
    try {
      await fetch('http://localhost:3000/logout', {
        method: 'POST',
      });
    } catch (error) {
      throw error;
    }
  };
  
  export { login, logout };