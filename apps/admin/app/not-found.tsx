export default function NotFound() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', color: '#f5f5f5', background: '#101010', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2>404 - Page Not Found</h2>
      <p style={{ color: '#b0b0b0' }}>The page you are looking for does not exist.</p>
      <a href="/" style={{ color: '#b7a5ff', marginTop: '16px', textDecoration: 'underline' }}>Return Home</a>
    </div>
  );
}
