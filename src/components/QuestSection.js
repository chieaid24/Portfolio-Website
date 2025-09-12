import { useMoney } from '@/lib/money-context';

function ProgressBar({
    done = 0,
    total = 0,
    color = 'bg-custom-red',
}) {
    const pct = total ? Math.round((done / total) * 100) : 0;
    const isComplete = pct >= 100;
    const fillClass = isComplete ? 'gradient-red-orange' : color;

    return (
        <div className="w-11/12 sm:w-4/5 md:w-3/5 lg:w-4/5">
            <div className="mt-1 h-[8px] w-full rounded-full bg-progress-background overflow-hidden min-w-0">
                <div
                    className={`h-full ${fillClass} rounded-full transition-all duration-700 ease-out motion-reduce:transition-none`}
                    style={{ width: `${pct}%` }}
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>
        </div>
    );
}


export default function QuestSection() {
    const { getQuestStats, getAllQuestsComplete } = useMoney();
    const stats = getQuestStats();
    const allQuestsComp = getAllQuestsComplete();

    // stats.redtext.total, stats.redtext.done, etc.

    return (
        <div className="ml-2 pt-2 pb-2 leading-none space-y-3 text-[10px] text-header-light font-medium tracking-wide">
            <div>
                <p>red words found: {stats.redtext.done}/{stats.redtext.total}</p>
                <ProgressBar done={stats.redtext.done} total={stats.redtext.total} />
            </div>

            <div>
                <p>projects discovered: {stats.project.done}/{stats.project.total}</p>
                <ProgressBar done={stats.project.done} total={stats.project.total} />
            </div>

            <div>
                <p>links followed: {stats.link.done}/{stats.link.total}</p>
                <ProgressBar done={stats.link.done} total={stats.link.total} />
            </div>
        </div>
    );
}
