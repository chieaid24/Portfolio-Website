export default function ChessBlitz(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 33 33"
            fill="none"
            {...props}
        >
            <g clipPath="url(#a)">
                <path
                    fill="#FAD541"
                    d="M7.946 20.51c-1.373 0-1.826-.533-1.6-1.865l2.04-13.593c.226-1.333.839-1.866 2.225-1.866h7.73c1.372 0 1.772.533 1.425 1.826L15.462 20.51H7.946Zm17.404-7.996c1.372 0 1.6.44.76 1.506L13.223 30.985c-1.64 2.172-2.132 1.959-1.693-.76l2.932-17.724 10.888.014Z"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M.256.52H32.24v31.984H.256z" />
                </clipPath>
            </defs>
        </svg>
    );
}