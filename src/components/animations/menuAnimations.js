export const menuVariants = {
    hidden: {
        opacity: 0,
        y: -50,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1], // ✅ easing fluide
        },
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6, // ✅ un peu plus long, plus doux
            ease: [0.25, 0.1, 0.25, 1],
            staggerChildren: 0.15, // ✅ apparition en cascade des liens
            when: "beforeChildren",
        },
    },
};
export const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut", // ✅ sortie fluide
        },
    },
};
