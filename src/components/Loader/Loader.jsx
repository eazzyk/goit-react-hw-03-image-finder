import { Audio } from 'react-loader-spinner';
// import css from './Loader.module.css';

const Loader = () => {
  return (
    <div>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="grey"
        ariaLabel="loading"
        // wrapperStyle=
        // wrapperClass
      />
    </div>
  );
};

export default Loader;
