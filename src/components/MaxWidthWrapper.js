export default function MaxWidthWrapper({ children, className = "" }) {
  return (
    <div
      className={
        "mx-auto w-full 2xl:w-[69%] " +
        "max-w-screen-lg sm:max-w-screen-xl lg:max-w-[65rem] xl:max-w-[70rem] 2xl:max-w-[70rem] 5xl:max-w-[80rem] " + // cap width
        "px-5 lg:px-6 " + // gutters
        className
      }
    >
      {children}
    </div>
  );
}