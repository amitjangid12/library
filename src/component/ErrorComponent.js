import React from 'react'
import { useNavigate } from 'react-router-dom';

function ErrorComponent() {

  const navigate = useNavigate()
  const pathname = window.location.pathname;
  const replace = pathname.replace('/', '');
  console.log(replace);

  return (

    <div style={{ textAlign: 'center' }}>
      <h2>' {replace} ' this page is not exists in this application</h2>
      <button style={{ outline: 'none', padding: '5px 20px', borderRadius: '10px', fontSize: '16px', cursor: 'pointer', marginRight: '5px' }} onClick={() => navigate('/')}>Come Back</button>
      <button style={{ outline: 'none', padding: '5px 20px', borderRadius: '10px', fontSize: '16px', cursor: 'pointer' }} onClick={() => window.location.reload()}>Reload</button>
    </div>
  )
}

export default ErrorComponent;