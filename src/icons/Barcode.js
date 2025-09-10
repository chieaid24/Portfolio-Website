export default function Barcode(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
                transform: "translate(0,0)",
            }}
            {...props}
        >
            <path
                d="M0 0h354v120H0z"
                style={{
                    fill: "transparent",
                }}
            />
            <g
                style={{
                    fill: "#000",
                }}
            >
                <path d="M10 10h4v100h-4zM16 10h2v100h-2zM22 10h2v100h-2zM32 10h6v100h-6zM40 10h6v100h-6zM48 10h4v100h-4zM54 10h2v100h-2zM62 10h4v100h-4zM68 10h6v100h-6zM76 10h2v100h-2zM84 10h4v100h-4zM90 10h2v100h-2zM98 10h2v100h-2zM102 10h2v100h-2zM110 10h4v100h-4zM120 10h4v100h-4zM126 10h6v100h-6zM134 10h2v100h-2zM142 10h2v100h-2zM150 10h4v100h-4zM156 10h2v100h-2zM164 10h4v100h-4zM174 10h2v100h-2zM178 10h2v100h-2zM186 10h4v100h-4zM196 10h2v100h-2zM204 10h2v100h-2zM208 10h4v100h-4zM218 10h2v100h-2zM222 10h6v100h-6zM230 10h2v100h-2zM238 10h4v100h-4zM244 10h2v100h-2zM252 10h2v100h-2zM256 10h6v100h-6zM264 10h4v100h-4zM274 10h2v100h-2zM282 10h4v100h-4zM288 10h2v100h-2zM296 10h4v100h-4zM302 10h4v100h-4zM312 10h4v100h-4zM318 10h4v100h-4zM328 10h6v100h-6zM336 10h2v100h-2zM340 10h4v100h-4z" />
            </g>
        </svg>
    );
}
