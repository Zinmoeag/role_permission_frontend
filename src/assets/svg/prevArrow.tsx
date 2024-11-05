
const PrevArrow: React.FC<SVGProps> = (prop) => {
  return (
    <svg
      width={prop.style.width}
      height={prop.style.height}
      viewBox="0 0 49 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M46.3268 13.9706C49.451 10.8464 49.451 5.78105 46.3268 2.65685C43.2026 -0.46734 38.1373 -0.46734 35.0131 2.65685L5.31459 32.3553C-0.933802 38.6037 -0.933805 48.7344 5.31458 54.9828L35.0131 84.6812C38.1373 87.8054 43.2026 87.8054 46.3268 84.6812C49.451 81.557 49.451 76.4917 46.3268 73.3675L34.306 61.3467C24.5429 51.5836 24.5429 35.7545 34.306 25.9914L46.3268 13.9706Z"
        fill={prop.style.color || "#000"}
      />
    </svg>
  );
};


export default PrevArrow;
