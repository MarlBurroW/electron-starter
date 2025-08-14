"use client"

import * as React from "react"
import { CalendarIcon, ChevronDownIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BirthDatePickerProps {
  date?: Date
  onDateChange: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function BirthDatePicker({
  date,
  onDateChange,
  placeholder = "Sélectionnez votre date de naissance",
  className,
  disabled = false
}: BirthDatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedYear, setSelectedYear] = React.useState<number>(date?.getFullYear() || new Date().getFullYear() - 25)
  const [selectedMonth, setSelectedMonth] = React.useState<number>(date?.getMonth() || 0)
  const [calendarDate, setCalendarDate] = React.useState<Date>(
    date || new Date(selectedYear, selectedMonth, 1)
  )

  // Générer les années (de 1900 à l'année actuelle)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i)
  
  // Mois en français
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ]

  // Mettre à jour le calendrier quand l'année ou le mois change
  React.useEffect(() => {
    const newDate = new Date(selectedYear, selectedMonth, 1)
    setCalendarDate(newDate)
  }, [selectedYear, selectedMonth])

  const handleYearChange = (year: string) => {
    const yearNum = parseInt(year)
    setSelectedYear(yearNum)
  }

  const handleMonthChange = (month: string) => {
    const monthNum = parseInt(month)
    setSelectedMonth(monthNum)
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      onDateChange(selectedDate)
      setIsOpen(false)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy", { locale: fr }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 border-b space-y-2">
          <div className="text-sm font-medium text-center mb-3">Sélection rapide</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Année</label>
              <Select value={selectedYear.toString()} onValueChange={handleYearChange}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                  <ChevronDownIcon className="h-3 w-3 opacity-50" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Mois</label>
              <Select value={selectedMonth.toString()} onValueChange={handleMonthChange}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                  <ChevronDownIcon className="h-3 w-3 opacity-50" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          month={calendarDate}
          onMonthChange={setCalendarDate}
          initialFocus
          captionLayout="dropdown_years"
          fromYear={1900}
          toYear={currentYear}
          className="p-0"
        />
      </PopoverContent>
    </Popover>
  )
}
