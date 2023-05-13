import Exchanges from '../../components/exchanges'
import { useRouter } from 'next/router'

export default function ExchangePage() {
  const { query } = useRouter()
  console.log(query.id)

  return (
    <>
      <section>{query.id && <Exchanges query={query.id} />}</section>

      <style jsx>{''}</style>
    </>
  )
}
