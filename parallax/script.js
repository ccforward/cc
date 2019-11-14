gsap.registerPlugin(ScrollTrigger);
let sections = gsap.utils.toArray(".section");
sections.forEach((section, i) => {
    let text = section.querySelector("h3");

    if (i % 2 === 0) {
        gsap.to(text, {
            scrollTrigger: {
                trigger: text,
                start: "50% 55%",
                toggleActions: "play pause resume reverse"
            },
            keyframes: [
                { left: "-20%", duration: 0 },
                { left: "50%", duration: 0.5 },
                { scale: 2, duration: 0.5 }
            ]
        });
    } else {
        gsap.to(text, {
            scrollTrigger: {
                trigger: text,
                start: "50% 55%",
                toggleActions: "play pause resume reverse"
            },
            keyframes: [
                { left: "120%", duration: 0 },
                { left: "50%", duration: 0.5 },
                { scale: 2, duration: 0.5 }
            ]
        });
    }
});