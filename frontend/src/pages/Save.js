import { exportComponentAsJPEG } from 'react-component-export-image';
import React, { useRef ,useEffect } from 'react';



const MyComponent = () => {
  const componentRef = useRef();

  const ComponentToPrint = React.forwardRef((props, ref) => (
    <img ref={ref} className='apple' alt='사과' src={props}/>
  ));
  useEffect(()=>{
    <ComponentToPrint ref={componentRef}/>
    exportComponentAsJPEG(componentRef);
  },[]);
  return (
    <React.Fragment>
      <ComponentToPrint ref={componentRef} />
      <button onClick={() => exportComponentAsJPEG(componentRef)}>
        Export As JPEG
      </button>
    </React.Fragment>
  );
};

export default MyComponent;