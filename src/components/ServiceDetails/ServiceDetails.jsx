const ServiceDetails = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-4 text-center px-4">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl md:text-[28px] mb-[14px] text-[#5D4F52]">
        Service Details
      </h2>

      {/* Progress Bars */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 w-full max-w-2xl">
        <div className="h-2 w-[70px] sm:w-[100px] md:w-[120px] rounded-md bg-[#01788E]" />
        <div className="h-2 w-[70px] sm:w-[100px] md:w-[120px] rounded-md bg-[#CBD5E1]" />
        <div className="h-2 w-[70px] sm:w-[100px] md:w-[120px] rounded-md bg-[#CBD5E1]" />
        <div className="h-2 w-[70px] sm:w-[100px] md:w-[120px] rounded-md bg-[#CBD5E1]" />
      </div>
    </div>
  );
};

export default ServiceDetails;
