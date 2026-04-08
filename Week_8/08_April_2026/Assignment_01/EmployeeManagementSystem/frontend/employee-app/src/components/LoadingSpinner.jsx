export default function LoadingSpinner() {
  return (
    <div style={styles.wrap}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Loading employees...</p>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { animation: spin 0.8s linear infinite; }
      `}</style>
    </div>
  )
}

const styles = {
  wrap: { display:'flex', flexDirection:'column', alignItems:'center', padding:60 },
  spinner: { width:48, height:48, border:'4px solid rgba(255,255,255,0.1)',
    borderTop:'4px solid #667eea', borderRadius:'50%', animation:'spin 0.8s linear infinite' },
  text: { color:'rgba(255,255,255,0.5)', marginTop:16 },
}