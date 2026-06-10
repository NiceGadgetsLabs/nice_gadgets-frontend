import './Loader.scss';

type LoaderProps = {
  size?: number;
};

export const Loader = ({ size = 40 }: LoaderProps) => {
  return (
    <div className="loader">
      <div
        className="loader__spinner"
        style={{
          width: size,
          height: size,
          borderWidth: size / 10,
        }}
      />
    </div>
  );
};
