export default function MaxWidthWrapper({ children, className = "" }) {
  return (
    <div
      className={
        "mx-auto w-full md:w-[69%] " +
        "max-w-screen-lg sm:max-w-screen-xl xl:max-w-[80rem] 2xl:max-w-[80rem] " + // cap width
        "px-6 md:px-0 " + // gutters
        className
      }
    >
      {children}
    </div>
  );
}