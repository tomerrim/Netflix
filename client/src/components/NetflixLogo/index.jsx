// eslint-disable-next-line react/prop-types
export const NetflixLogo = ({className, width, height, onClick}) => {
    return (
      <div className={`netflixLogo ${className}`} onClick={onClick}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt="Netflix Logo"
          width={width} height={height}
        />
      </div>
    );
}