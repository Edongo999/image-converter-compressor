// Animation container pour textes (stagger)
export const containerText = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.25,
        },
    },
};
// Animation item pour textes (fade-up)
export const itemFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] },
    },
};
