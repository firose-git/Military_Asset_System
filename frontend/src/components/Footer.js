import React from 'react';

export default function Footer(){
  return (
    <div className="footer">
      <div>© {new Date().getFullYear()} Military Asset System — Built for demonstration</div>
      <div style={{marginTop:6}}>Contact: <a href="mailto:Military12@gmail.com">Military12@gmail.com</a></div>
    </div>
  );
}
