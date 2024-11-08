import LeaderboardCard from "./_components/LeaderboardCard";

export default function Leaderboard() {
    return (
        <>
            <div className="flex flex-col gap-4 md:gap-5 md:mt-7 items-start w-[95%] md:w-[85%] mx-auto">
                <p className="text-xl md:text-4xl font-bold text-white">Leaderboard</p>
                <p className={`text-white text-start md:text-center text-base px-0 leading-7 md:text-lg font-medium md:leading-[23.4px]`}>Compare your progress with our top users</p>
                <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-4">
                    <LeaderboardCard title="Today" data={[{ id: 1, name: 'Nate', score: '10' }, { id: 1, name: 'Nate', score: '10' }]} />
                    <LeaderboardCard title="Last 7 Days" data={[{ id: 1, name: 'Nate', score: '10' }, { id: 1, name: 'Nate', score: '10' }]} />
                    <LeaderboardCard title="Last 30 Days" data={[{ id: 1, name: 'Nate', score: '10' }, { id: 1, name: 'Nate', score: '10' }]} />
                    <LeaderboardCard title="All Time" data={[{ id: 1, name: 'Nate', score: '10' }, { id: 1, name: 'Nate', score: '10' }]} />
                </div>
            </div>
        </>
    );
}
