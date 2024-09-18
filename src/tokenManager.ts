let accessToken: string | null = localStorage.getItem('accessToken');

window.addEventListener('storage', (event) => {
  if (event.key === 'accessToken') {
    accessToken = event.newValue;
  }
});

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (token) {
    localStorage.setItem('accessToken', token);
  } else {
    localStorage.removeItem('accessToken');
  }
}

export function getAccessToken(): string | null {
  return accessToken;
}
