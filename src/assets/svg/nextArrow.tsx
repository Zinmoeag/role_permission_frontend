

const NextArrrow : React.FC<SVGProps> = (prop) => {
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
        d="M3.01209 13.9706C-0.112103 10.8464 -0.112103 5.78105 3.01209 2.65685C6.13629 -0.46734 11.2016 -0.46734 14.3258 2.65685L44.0243 32.3553C50.2727 38.6037 50.2727 48.7344 44.0243 54.9828L14.3258 84.6812C11.2016 87.8054 6.13629 87.8054 3.01209 84.6812C-0.112103 81.557 -0.112103 76.4917 3.01209 73.3675L15.0329 61.3467C24.796 51.5836 24.796 35.7545 15.0329 25.9914L3.01209 13.9706Z"
        fill={prop.style.color || "#000000"} 
      />
    </svg>
  );
};

export default NextArrrow;
