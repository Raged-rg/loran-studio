import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Loran Studio Error Boundary Captured Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // If a crash happens, render the detailed red debug console at the top of the fallback page
      return (
        <div style={{ 
          padding: '24px', 
          backgroundColor: '#FFF1F2', 
          border: '3px solid #F43F5E', 
          color: '#9F1239', 
          fontFamily: 'monospace', 
          zIndex: 999999, 
          position: 'relative', 
          margin: '20px', 
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          direction: 'ltr',
          textAlign: 'left'
        }}>
          <h2 style={{ margin: '0 0 12px 0', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🚨 LORAN STUDIO - RUNTIME CRASH CAPTURED
          </h2>
          <p style={{ fontWeight: 'bold', margin: '0 0 12px 0', fontSize: '14px', borderBottom: '1px solid #FDA4AF', paddingBottom: '8px' }}>
            Message: {this.state.error?.message || String(this.state.error)}
          </p>
          <pre style={{ 
            whiteSpace: 'pre-wrap', 
            margin: '0', 
            fontSize: '11px', 
            backgroundColor: '#FFE4E6', 
            padding: '12px', 
            borderRadius: '8px', 
            maxHeight: '300px', 
            overflowY: 'auto',
            lineHeight: '1.5'
          }}>
            {this.state.error?.stack}
          </pre>
          <div style={{ marginTop: '24px', opacity: 0.6 }}>
            {this.props.fallback}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
