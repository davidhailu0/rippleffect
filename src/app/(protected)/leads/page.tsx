import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeadsTable from "./_components/Leadstable";
import ShowName from "./_components/ShowName";
import LeaderboardCard from "./_components/LeaderboardCard";
import ReferalComponent from "./_components/ReferalCard";

export default function Leads() {

    return (
        <>
            <div className="flex flex-col gap-4 md:gap-5 md:mt-7 items-start w-[95%] md:w-[85%] mx-auto">
                <Tabs defaultValue="leads" className="w-full">
                    <TabsList className="flex justify-start mb-4 shadow-lg py-6 gap-4">
                        <TabsTrigger value="leads" className="py-2 px-4 font-semibold">
                            Leads
                        </TabsTrigger>
                        <TabsTrigger value="leaderboard" className="py-2 px-4 font-semibold">
                            Leaderboard
                        </TabsTrigger>
                        <TabsTrigger value="landing-page" className="py-2 px-4 font-semibold">
                            Landing Pages
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="leads" className="p-4 bg-[#2A2D47] rounded shadow-sm">
                        <p className="text-xl md:text-4xl font-bold text-white">Your Lead List</p>
                        <ShowName />
                        <p className="text-white text-lg">Referrer: No Referrer</p>
                        <LeadsTable />
                    </TabsContent>

                    <TabsContent value="leaderboard" className="p-4 bg-[#2A2D47] rounded shadow-sm">
                        <p className="text-xl md:text-4xl font-bold text-white">Leaderboard</p>
                        <p className={`my-4 text-white text-start text-base px-0 leading-7 md:text-lg font-medium md:leading-[23.4px]`}>Compare your progress with our top users</p>
                        <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-4">
                            <LeaderboardCard title="Today" data={[{ id: 1, name: 'Nate', score: '10' }, { id: 1, name: 'Nate', score: '10' }]} />
                            <LeaderboardCard title="Last 7 Days" data={[{ id: 1, name: 'Nate', score: '10' }, { id: 1, name: 'Nate', score: '10' }]} />
                            <LeaderboardCard title="Last 30 Days" data={[{ id: 1, name: 'Nate', score: '10' }, { id: 1, name: 'Nate', score: '10' }]} />
                            <LeaderboardCard title="All Time" data={[{ id: 1, name: 'Nate', score: '10' }, { id: 1, name: 'Nate', score: '10' }]} />
                        </div>
                    </TabsContent>

                    <TabsContent value="landing-page" className="p-4 bg-[#2A2D47] rounded shadow-sm">
                        <p className="text-xl md:text-4xl font-bold text-white">Landing Pages</p>
                        <p className={`my-4 text-[rgba(255,255,255,0.57)] text-lg px-0 leading-7 md:text-lg font-medium md:leading-[23.4px] mb-4 md:mb-9`}>Choose your favorite Landing Page and Copy Your Personal Link</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full gap-y-7">
                            <ReferalComponent page={1} />
                            <ReferalComponent page={2} />
                            {/* <ReferalComponent page={3} />
                    <ReferalComponent page={4} /> */}
                            {/*<ReferalComponent />
                    <ReferalComponent /> */}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}


