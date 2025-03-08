"use client"

import { useState, useEffect } from "react"
import { PatientCard } from "@/components/patient-card"
import { AppointmentsView } from "@/components/appointments-view"
import { action } from "@/app/api"
import { doctor } from "@/app/api"

export function PatientDashboard() {
  const [selectedActionId, setSelectedActionId] = useState<number | null>(null)
  const [actions, setActions] = useState<any[]>([])
  const [doctors, setDoctors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [actionsData, doctorsData] = await Promise.all([action.getAllActions(), doctor.getAllDoctors()])
        setActions(actionsData)
        setDoctors(doctorsData)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch data. Please try again.")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      {selectedActionId === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action) => (
            <PatientCard key={action.id} action={action} onViewAppointments={() => setSelectedActionId(action.id)} />
          ))}
        </div>
      ) : (
        <AppointmentsView actionId={selectedActionId} doctors={doctors} onBack={() => setSelectedActionId(null)} />
      )}
    </div>
  )
}

