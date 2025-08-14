import Head from "next/head";
import KanbanBoard from "../components/kanbanBoard/KanbanBoard";
import HeaderBar from "@/components/kanbanBoard/HeaderBar";
import DashboardLayout from "@/components/kanbanBoard/DashBoardLayout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Panda Kanban</title>
      </Head>
      <main className="min-h-screen bg-[#F8FAFC]">
       <DashboardLayout/>
        {/* <section className="max-w-6xl mx-auto">
          <KanbanBoard />
        </section> */}
      </main>
    </>
  );
}
