export default function ProjectTicket(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 462 133.96" {...props}>
            <defs>
                <filter
                    id="a"
                    width={462}
                    height={133.96}
                    x={0}
                    y={0}
                    filterUnits="userSpaceOnUse"
                >
                    <feOffset dy={4} />
                    <feGaussianBlur result="blur" stdDeviation={1} />
                    <feFlood floodColor="#231f20" floodOpacity={0.2} />
                    <feComposite in2="blur" operator="in" />
                    <feComposite in="SourceGraphic" />
                </filter>
            </defs>
            <g
                data-name="Layer 2"
                style={{
                    isolation: "isolate",
                }}
            >
                <path
                    d="M3.68 94.39c12.04-5.13 21.81-17.06 21.81-30.98S15.21 37.61 3.17 32.48L3.68 0h454.6l.16 32.8c-12.04 5.13-21.64 16.69-21.64 30.61s10.01 25.86 22.05 30.99l-.57 32.42H3.68V94.39Z"
                    data-name="Layer 1"
                    style={{
                        fill: "currentColor",
                        filter: "url(#a)",
                        mixBlendMode: "lighten",
                    }}
                />
            </g>
        </svg>
    );
}