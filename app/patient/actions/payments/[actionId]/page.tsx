import { PaymentsView } from "@/components/payments-view"

export default function PaymentsPage({ params }: { params: { actionId: string } }) {
  return <PaymentsView actionId={Number.parseInt(params.actionId, 10)} />
}

