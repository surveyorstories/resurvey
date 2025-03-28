import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import FormSection from '../components/FormSection'
import MappingTable from '../components/MappingTable'
import PreviewSection from '../components/PreviewSection'
import { toast } from '../components/ui/use-toast'
import { Button } from '../components/ui/button'
import { Printer } from 'lucide-react'
import Layout from '@theme/Layout'

function Index() {
  // Form state
  const [districtName, setDistrictName] = useState('')
  const [mandalName, setMandalName] = useState('')
  const [villageName, setVillageName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [notificationNumber, setNotificationNumber] = useState('')
  const [notificationDate, setNotificationDate] = useState('')
  const [printedDate, setPrintedDate] = useState('')
  const [noticeType, setNoticeType] = useState('GT Notice')
  const [officerName, setOfficerName] = useState('')
  const [officerDesignation, setOfficerDesignation] = useState('')

  // CSV data state
  const [headers, setHeaders] = useState<string[]>([])
  const [data, setData] = useState<string[][]>([])
  const [showMapping, setShowMapping] = useState(false)

  // Mapping and preview state
  const [mapping, setMapping] = useState<Record<string, string>>({})
  const [showPreview, setShowPreview] = useState(false)

  const handleFileUpload = (headers, data) => {
    setHeaders(headers)
    setData(data)
    setShowMapping(true)
    setShowPreview(false)

    toast({
      title: 'CSV Uploaded Successfully',
      description: `${data.length} rows loaded. Please map the columns.`
    })
  }

  const handleMappingSubmit = (mapping) => {
    setMapping(mapping)
    setShowPreview(true)

    toast({
      title: 'Column Mapping Complete',
      description: 'Preview generated. You can now print the notices.'
    })
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <Layout title="Resurvey Notice Generator" description="Generate Resurvey Notices with ease.">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className='min-h-screen w-full overflow-hidden bg-gradient-to-b from-background to-secondary/20'
      >
        <div className='container mx-auto w-full max-w-6xl overflow-hidden px-2 py-8 sm:px-4'>
          <div className='whitespace-nowrap'>
            <Header />
          </div>

          <div className='mt-8 w-full space-y-8 overflow-hidden print:m-0'>
            <FormSection
              onFileUpload={handleFileUpload}
              districtName={districtName}
              setDistrictName={setDistrictName}
              mandalName={mandalName}
              setMandalName={setMandalName}
              villageName={villageName}
              setVillageName={setVillageName}
              startDate={startDate}
              setStartDate={setStartDate}
              startTime={startTime}
              setStartTime={setStartTime}
              notificationNumber={notificationNumber}
              setNotificationNumber={setNotificationNumber}
              notificationDate={notificationDate}
              setNotificationDate={setNotificationDate}
              printedDate={printedDate}
              setPrintedDate={setPrintedDate}
              noticeType={noticeType}
              setNoticeType={setNoticeType}
              officerName={officerName}
              setOfficerName={setOfficerName}
              officerDesignation={officerDesignation}
              setOfficerDesignation={setOfficerDesignation} />

            <MappingTable
              headers={headers}
              show={showMapping}
              onMappingSubmit={handleMappingSubmit}
              onPreview={() => setShowPreview(true)}
              noticeType={noticeType} />

            <PreviewSection
              districtName={districtName}
              mandalName={mandalName}
              villageName={villageName}
              startDate={startDate}
              startTime={startTime}
              notificationNumber={notificationNumber}
              notificationDate={notificationDate}
              printedDate={printedDate}
              show={showPreview}
              headers={headers}
              data={data}
              mapping={mapping}
              noticeType={noticeType}
              officerName={officerName}
              officerDesignation={officerDesignation} />
          </div>
        </div>

        {showPreview && (
          <div className='fixed bottom-8 right-8 z-50 print:hidden'>
            <Button
              onClick={handlePrint}
              className='flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90'
              size='icon'
            >
              <Printer className='h-6 w-6' />
            </Button>
          </div>
        )}
      </motion.div> </Layout>
  )
}

export default Index
