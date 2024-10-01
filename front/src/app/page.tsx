import Tabs from "@/components/Tabs";
import FilmsPage from "@/components/FilmsPage/page";
import PeoplePage from "@/components/people/page";
import PlanetsPage from "@/components/PlanetsPage/page";
import StarshipsPage from "@/components/StarshipsPage/page";
import StarField from "@/styles/star";

 
export default function Home() {
  const tabs = [
    { label: "People", content: <PeoplePage /> },
    { label: "Starships", content: <StarshipsPage /> },
    { label: "Planets", content: <PlanetsPage /> },
    { label: "Films", content: <FilmsPage /> },
  ];

  return (<>
   <StarField />
    <Tabs tabs={tabs} />
   </>
  );
}
