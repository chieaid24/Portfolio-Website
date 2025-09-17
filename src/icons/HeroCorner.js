export default function HeroCorner(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={64}
            height={64}
            fill="none"
            {...props}
        >
            <path fill="currentColor" d="M0 0h64v22c0 23.196-18.804 42-42 42H0V0Z" />
        </svg>
    );
}