export const getLayouts = async (token) => {
    const response = await fetch('http://54.242.171.0/api/layouts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch layouts');
    }
    return response.json();
  };