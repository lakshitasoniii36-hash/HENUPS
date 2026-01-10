// Refined AmbientIntelligence Component - Replace lines 69-182 in IDE.jsx

function AmbientIntelligence({ isTyping, isThinking, isPaused }) {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            {/* HENU PS Logo - Centered, Slightly Larger, Faded */}
            <motion.img
                src="/LOGO.svg"
                alt=""
                className="absolute"
                style={{
                    width: '240px',
                    height: 'auto',
                    top: '50%',
                    transform: 'translateY(-50%)'
                }}
                animate={
                    isTyping
                        ? {
                            opacity: 0.10,
                            filter: 'drop-shadow(0 0 24px rgba(189, 147, 249, 0.25))'
                        }
                        : {
                            opacity: 0.06,
                            filter: 'drop-shadow(0 0 16px rgba(189, 147, 249, 0.12))'
                        }
                }
                transition={{
                    duration: 0.6,
                    ease: "easeInOut"
                }}
            />
        </div>
    );
}
