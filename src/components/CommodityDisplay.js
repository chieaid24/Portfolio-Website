import Image from 'next/image'
import CountUp from '@/components/CountUp';


// components/CommodityDisplay.jsx
export default function CommodityDisplay({ commodity, balanceInDollars }) {
    if (!commodity) return null;

    const { id, what, name, price, note } = commodity;
    const title = name ?? what ?? id ?? 'Commodity';
    const priceNum = Number(price) || 0;

    const canBuy = priceNum > 0 ? balanceInDollars / priceNum : 0;

    // As a STRING with exactly 3 significant digits (keeps trailing zeros)
    const fmtUpTo3SF = new Intl.NumberFormat(undefined, { maximumSignificantDigits: 3 });

    // formatter now returns { value, suffix }
    const { value: prettyQty, suffix } = (() => {
        const n = Number(canBuy) || 0;
        const abs = Math.abs(n);
        const fmt = new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 });

        if (abs >= 1e15) return { value: fmtUpTo3SF.format(fmt.format(n / 1e15)), suffix: 'q' }; // quadrillion
        if (abs >= 1e12) return { value: fmtUpTo3SF.format(fmt.format(n / 1e12)), suffix: 't' }; // trillion
        if (abs >= 1e9) return { value: fmtUpTo3SF.format(fmt.format(n / 1e9)), suffix: 'b' }; // billion
        if (abs >= 1e6) return { value: fmtUpTo3SF.format(fmt.format(n / 1e6)), suffix: 'm' }; // million
        if (abs >= 1e3) return { value: fmtUpTo3SF.format(fmt.format(n / 1e3)), suffix: 'k' }; // thousand

        return { value: fmtUpTo3SF.format(fmt.format(n)), suffix: '' }; // base case, no suffix
    })();

    return (
        <div className="flex flex-col items-center font-semibold">
            <div className="text-6xl text-custom-red inline-block">
                <CountUp
                to={prettyQty}
                from={0}
                direction="up"
                />
                {suffix && (
                    <span className="text-5xl">
                        {suffix}
                    </span>
                )}
            </div>
            <p className="text-dark-grey-text font-semibold items-center text-sm text-center leading-tight">
                {title}
                {/* <Image
                    src="/icons/info_icon_v1-01.svg"
                    width={12}
                    height={12}
                    alt="Info"
                    className="ml-1 mb-0.5 inline"
                /> */}
            </p>
        </div>
    );
}
