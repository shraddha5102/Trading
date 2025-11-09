import { Header } from '@/components/layout/Header'
import { StatsFooter } from '@/components/layout/StatsFooter'
import { TokenTable } from '@/components/table/TokenTable'

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <Header />
      <TokenTable />
      <StatsFooter />
    </main>
  )
}