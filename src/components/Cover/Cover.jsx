const Cover = ({ image, title }) => {
    return (
        <section
            className="relative w-full h-72 md:h-[130px] lg:h-[520px] bg-center bg-cover"
            style={{ backgroundImage: `url(${image})` }}
            aria-label={title}
        >
            {/* Dark gradient overlay (beautiful, subtle) */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />


            {/* Soft vignette to darken edges */}
            <div className="absolute inset-0 pointer-events-none" style={{
                boxShadow: 'inset 0 80px 120px rgba(0,0,0,0.45)',
            }} />


            {/* Centered title */}
            <div className="absolute inset-0 flex items-center justify-center px-6">
                <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-semibold text-center leading-tight drop-shadow-lg">
                    {title}
                </h1>
            </div>


            {/* Optional subtle decorative bottom stripe */}
            <div className="absolute left-0 right-0 bottom-0 h-6 bg-gradient-to-t from-black/40 to-transparent" />
        </section>
    );
};


export default Cover;