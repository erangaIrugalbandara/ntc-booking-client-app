export const getLayouts = async (token) => {
    const response = await fetch('http://localhost:5000/api/layouts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch layouts');
    }
    return response.json();
  };