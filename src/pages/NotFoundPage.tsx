import k2Image from './K2.png';

export const NotFoundPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${k2Image})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* <h1>NotFoundPage</h1> */}
    </div>
  );
};
