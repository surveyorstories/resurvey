import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Upload } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../components/ui/select'
import { districts } from '../data/districts'
import { sanitizeString, sanitizeCSVData } from '../lib/sanitize'
import { toast } from '../components/ui/use-toast'

interface FormSectionProps {
  onFileUpload: (headers: string[], data: string[][]) => void
  districtName: string
  setDistrictName: (value: string) => void
  mandalName: string
  setMandalName: (value: string) => void
  villageName: string
  setVillageName: (value: string) => void
  startDate: string
  setStartDate: (value: string) => void
  startTime: string
  setStartTime: (value: string) => void
  notificationNumber: string
  setNotificationNumber: (value: string) => void
  notificationDate: string
  setNotificationDate: (value: string) => void
  printedDate: string
  setPrintedDate: (value: string) => void
  noticeType: string
  setNoticeType: (value: string) => void
  officerName: string
  setOfficerName: (value: string) => void
  officerDesignation: string
  setOfficerDesignation: (value: string) => void
}

// Officer designation options with both English and Telugu values
export const officerDesignations = [
  { value: 'Village Surveyor', display: 'Village Surveyor', te: 'గ్రామ సర్వేయర్' },
  { value: 'Mandal Surveyor', display: 'Mandal Surveyor', te: 'మండల సర్వేయర్' },
  {
    value: 'Village Revenue Officer',
    display: 'Village Revenue Officer',
    te: 'గ్రామ రెవిన్యూ అధికారి'
  },
  {
    value: 'Deputy Tahsildhar',
    display: 'Deputy Tahsildhar (Resurvey)',
    te: 'ఉప తహశీల్దార్ (రీ సర్వే)'
  },
  { value: 'Tahsildhar', display: 'Tahsildhar', te: 'తహశీల్దార్' }
]

const FormSection: React.FC<FormSectionProps> = ({
  onFileUpload,
  districtName,
  setDistrictName,
  mandalName,
  setMandalName,
  villageName,
  setVillageName,
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  notificationNumber,
  setNotificationNumber,
  notificationDate,
  setNotificationDate,
  noticeType,
  setNoticeType,
  officerName,
  setOfficerName,
  officerDesignation,
  setOfficerDesignation,

  printedDate,
  setPrintedDate
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    processCSVFile(file)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (!file || !file.name.endsWith('.csv')) return

    setFileName(file.name)
    processCSVFile(file)
  }

  const processCSVFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      const rows = content.split('\n').map((row) => row.split(',').map((cell) => cell.trim()))

      if (rows.length > 1) {
        // Sanitize headers and data to prevent XSS attacks
        const headers = rows[0].map(header => sanitizeString(header))
        const rawData = rows.slice(1).filter((row) => row.some((cell) => cell.trim() !== ''))
        const data = sanitizeCSVData(rawData)
        onFileUpload(headers, data)
      }
    }
    reader.readAsText(file)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className='no-print'
    >
      <Card className='glass-panel overflow-hidden'>
        <CardContent className='pt-6'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='space-y-6'
          >
            {/* notice type section was previously here  */}
            <h2 className='text-2xl font-medium'>Notice Type</h2>
            <div className='mb-6'>
              <RadioGroup
                value={noticeType}
                onValueChange={setNoticeType}
                className='flex flex-col space-y-2 sm:flex-row sm:space-x-6 sm:space-y-0'
              >
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='GT Notice' id='gt-notice' />
                  <Label htmlFor='gt-notice'>Ground Truthing Notice</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='GV Notice' id='gv-notice' />
                  <Label htmlFor='gv-notice'>Ground Validation Notice</Label>
                </div>
              </RadioGroup>
            </div>

            <h2 className='text-2xl font-medium'>Village Details</h2>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              <div className='space-y-2'>
                <Label htmlFor='districtName'>District Name</Label>
                <Select value={districtName} onValueChange={(value) => setDistrictName(value)}>
                  <SelectTrigger className='form-input'>
                    <SelectValue placeholder='Select district' />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district.value} value={district.value}>
                        {district.display} - {district.te}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='mandalName'>Mandal Name Telugu</Label>
                <Input
                  id='mandalName'
                  placeholder='Enter mandal name'
                  className='form-input'
                  value={mandalName}
                  onChange={(e) => setMandalName(sanitizeString(e.target.value))}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='villageName'>Village Name Telugu</Label>
                <Input
                  id='villageName'
                  placeholder='Enter village name'
                  className='form-input'
                  value={villageName}
                  onChange={(e) => setVillageName(sanitizeString(e.target.value))}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='startDate'>Date</Label>
                <Input
                  id='startDate'
                  type='date'
                  className='form-input'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='startTime'>Time</Label>
                <Input
                  id='startTime'
                  type='time'
                  className='form-input'
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='notificationNumber'>6(1) Notification Number</Label>
                <Input
                  id='notificationNumber'
                  placeholder='Enter 6(1) Notification Number'
                  className='form-input'
                  value={notificationNumber}
                  onChange={(e) => setNotificationNumber(sanitizeString(e.target.value))}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='notificationDate'>6(1) Notification Date</Label>
                <Input
                  id='notificationDate'
                  type='date'
                  className='form-input'
                  value={notificationDate}
                  onChange={(e) => setNotificationDate(e.target.value)}
                />
              </div>

              {noticeType === 'GV Notice' && (
                <>
                  <div className='space-y-2'>
                    <Label htmlFor='officerName'>Officer Name </Label>
                    <Input
                      id='officerName'
                      placeholder='Enter officer name'
                      className='form-input'
                      value={officerName}
                      onChange={(e) => setOfficerName(sanitizeString(e.target.value))}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='officerDesignation'>Officer Designation</Label>
                    <Select
                      value={officerDesignation}
                      onValueChange={(value) => setOfficerDesignation(value)}
                    >
                      <SelectTrigger className='form-input'>
                        <SelectValue placeholder='Select officer designation' />
                      </SelectTrigger>
                      <SelectContent>
                        {officerDesignations.map((designation) => (
                          <SelectItem key={designation.value} value={designation.value}>
                            {designation.display}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              <div className='space-y-2'>
                <Label htmlFor='printedDate'>Notice Printed Date</Label>
                <Input
                  id='printedDate'
                  type='date'
                  className='form-input'
                  value={printedDate}
                  onChange={(e) => setPrintedDate(e.target.value)}
                />
              </div>
            </div>

            {/* new place for notice type section  */}

            {/* end of new noitce type section */}

            <div className='pt-4'>
              <h2 className='mb-4 text-2xl font-medium'>Upload CSV File</h2>
              <div
                className={`rounded-lg border-2 border-dashed p-6 text-center transition-all ${isDragging
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-300 hover:border-primary/50'
                  }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className='flex flex-col items-center justify-center space-y-3'>
                  <div className='rounded-full bg-primary/10 px-5 py-1'>
                    <Upload className='h-6 w-6 text-primary' />
                  </div>
                  <div className='text-center'>
                    <p className='text-sm text-gray-600'>
                      {fileName
                        ? `Selected file: ${fileName}`
                        : 'Drag and drop your CSV file here, or click to browse'}
                    </p>
                  </div>
                  <input
                    type='file'
                    id='csvFile'
                    className='hidden'
                    accept='.csv'
                    onChange={handleFileChange}
                  />
                  <Button
                    variant='outline'
                    onClick={() => document.getElementById('csvFile')?.click()}
                    className='mt-2'
                  >
                    Browse Files
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default FormSection
