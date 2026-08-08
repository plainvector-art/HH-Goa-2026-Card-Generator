const API_BASE = '/api';

export const fetchCards = async (search = '', builderClass = 'ALL') => {
  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (builderClass && builderClass !== 'ALL') params.append('builderClass', builderClass);

    const response = await fetch(`${API_BASE}/cards?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch cards');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return { count: 0, cards: [] };
  }
};

export const fetchCardById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/cards/${id}`);
    if (!response.ok) throw new Error('Card not found');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
};

export const saveCard = async (cardData) => {
  try {
    const response = await fetch(`${API_BASE}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardData)
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Failed to save card');
    }
    return await response.json();
  } catch (error) {
    console.error('API Save Error:', error);
    throw error;
  }
};

export const uploadAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) throw new Error('Failed to upload image');
    return await response.json();
  } catch (error) {
    console.error('Upload Error:', error);
    throw error;
  }
};

export const fetchStats = async () => {
  try {
    const response = await fetch(`${API_BASE}/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return await response.json();
  } catch (error) {
    console.error('Stats Error:', error);
    return { totalBuilders: 0, topClass: 'TERMINAL WIZARD' };
  }
};
